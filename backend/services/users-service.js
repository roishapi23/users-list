const cache = require("./cache-service");
const apiService = require("./api-service");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const cacheKey = "usersList";

const userSchema = Joi.object({
  id: Joi.alternatives().try(Joi.number(), Joi.string()),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  avatar: Joi.string().required(),
  page: Joi.string(),
});

const getUsers = async (page) => {
  // check if there are users in the cache
  const cachedData = cache.get(cacheKey);

  // if page data is in the cache - return the data
  if (cachedData) {
    let pageData = cachedData.data.filter((c) => c.page == page);
    if (pageData.length > 0) {
      return { ...cachedData, data: pageData };
    }
  }

  // if page data not in the cache - fetch the page data
  let res = await apiService.fetchData(`/users?page=${page}`);
  let customResData = res.data.map((d) => {
    return { ...d, page };
  });

  // add new page data to cached data
  if (cachedData) {
    cachedData.data = [...cachedData.data, ...customResData];
  }

  // if cache is empty - save also the pagination info
  let newCache = cachedData
    ? cachedData
    : {
        total: res.total,
        per_page: res.per_page,
        total_pages: res.total_pages,
        data: customResData,
      };

  // save in cache
  cache.set(cacheKey, newCache);
  return res;
};

const getUser = async (userId) => {
  // Check if there are users in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    // if user exist is in the cache - return the his data
    let user = cachedData.data.find((u) => u.id == userId);
    if (user) {
      return { data: user };
    }
  }
  // if user not exist in the cache - fetch his data and return it
  let res = await apiService.fetchData(`/users/${userId}`);
  return res;
};

const createUser = async (userInfo) => {
  // validate new user data
  const { error } = userSchema.validate(userInfo);
  if (error) {
    throw new Error();
  }

  // get users from cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    // update users total amount
    cachedData.total++;

    // check if new users amout should be in a new page
    if (cachedData.total / cachedData.per_page > cachedData.total_pages) {
      cachedData.total_pages++;
    }
    // add user to cache , to the last page
    cachedData.data.push({
      id: uuidv4(),
      ...userInfo,
      page: cachedData.total_pages,
    });
    cache.set(cacheKey, cachedData);
    return { data: userInfo };
  }
};

const updateUser = async (userInfo, userId) => {
  // validate new user data
  const { error } = userSchema.validate(userInfo);
  if (error) {
    throw new Error();
  }

  // get users from cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    let userIndex = cachedData.data.findIndex((u) => u.id == userId);
    if (userIndex != -1) {
      // update user info in the cache
      cachedData.data[userIndex] = userInfo;
      cache.set(cacheKey, cachedData);
      return { data: userInfo };
    }
  }
};

const deleteUser = async (userId) => {
  // get users from cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    let userIndex = cachedData.data.findIndex((u) => u.id == userId);
    if (userIndex != -1) {
      // remove user from cache
      cachedData.data.splice(userIndex, 1);
      cachedData.total--;

      // check if new users amout decrease the pages amount
      if (
        cachedData.total / cachedData.per_page == cachedData.total_pages &&
        cachedData.total_pages > 1
      ) {
        cachedData.total_pages--;
      }

      // make sure that that is no page that has less users from the amount he should have
      // for example - if user was removed from page 1 and page amount is 6, make sure that page 1 still return 6 users,
      // in this case that means in the ui that one user from page 2 will move to be at page 1
      let pageNumber = 1;
      let counter = 0;
      let newCachedUsers = cachedData.data.map((d) => {
        if (counter == cachedData.per_page) {
          pageNumber++;
          counter = 0;
        }
        counter++;
        return {
          ...d,
          page: `${pageNumber}`,
        };
      });
      let newCachedData = { ...cachedData, data: newCachedUsers };
      cache.set(cacheKey, newCachedData);
      return { data: newCachedData };
    }
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
};
