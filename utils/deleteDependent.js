/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter7984 = { 'updatedBy': { '$in': user } };
      const Blog9268 = await deleteBlog(BlogFilter7984);
      const BlogFilter2968 = { 'addedBy': { '$in': user } };
      const Blog6462 = await deleteBlog(BlogFilter2968);
      const userFilter6564 = { 'addedBy': { '$in': user } };
      const user9443 = await deleteUser(userFilter6564);
      const userFilter9284 = { 'updatedBy': { '$in': user } };
      const user7115 = await deleteUser(userFilter9284);
      const userTokensFilter0579 = { 'userId': { '$in': user } };
      const userTokens4933 = await deleteUserTokens(userTokensFilter0579);
      const userTokensFilter5492 = { 'addedBy': { '$in': user } };
      const userTokens8934 = await deleteUserTokens(userTokensFilter5492);
      const userTokensFilter7228 = { 'updatedBy': { '$in': user } };
      const userTokens1276 = await deleteUserTokens(userTokensFilter7228);
      const roleFilter7690 = { 'addedBy': { '$in': user } };
      const role4397 = await deleteRole(roleFilter7690);
      const roleFilter8299 = { 'updatedBy': { '$in': user } };
      const role5529 = await deleteRole(roleFilter8299);
      const projectRouteFilter4250 = { 'addedBy': { '$in': user } };
      const projectRoute1813 = await deleteProjectRoute(projectRouteFilter4250);
      const projectRouteFilter7880 = { 'updatedBy': { '$in': user } };
      const projectRoute0526 = await deleteProjectRoute(projectRouteFilter7880);
      const routeRoleFilter4964 = { 'addedBy': { '$in': user } };
      const routeRole5582 = await deleteRouteRole(routeRoleFilter4964);
      const routeRoleFilter5672 = { 'updatedBy': { '$in': user } };
      const routeRole9055 = await deleteRouteRole(routeRoleFilter5672);
      const userRoleFilter0126 = { 'userId': { '$in': user } };
      const userRole1254 = await deleteUserRole(userRoleFilter0126);
      const userRoleFilter5992 = { 'addedBy': { '$in': user } };
      const userRole7474 = await deleteUserRole(userRoleFilter5992);
      const userRoleFilter3531 = { 'updatedBy': { '$in': user } };
      const userRole1735 = await deleteUserRole(userRoleFilter3531);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter6919 = { 'roleId': { '$in': role } };
      const routeRole4489 = await deleteRouteRole(routeRoleFilter6919);
      const userRoleFilter7506 = { 'roleId': { '$in': role } };
      const userRole4498 = await deleteUserRole(userRoleFilter7506);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter5148 = { 'routeId': { '$in': projectroute } };
      const routeRole7764 = await deleteRouteRole(routeRoleFilter5148);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter0949 = { 'updatedBy': { '$in': user } };
      const Blog3421 = await softDeleteBlog(BlogFilter0949, updateBody);
      const BlogFilter1186 = { 'addedBy': { '$in': user } };
      const Blog2906 = await softDeleteBlog(BlogFilter1186, updateBody);
      const userFilter9027 = { 'addedBy': { '$in': user } };
      const user3906 = await softDeleteUser(userFilter9027, updateBody);
      const userFilter7409 = { 'updatedBy': { '$in': user } };
      const user1967 = await softDeleteUser(userFilter7409, updateBody);
      const userTokensFilter7734 = { 'userId': { '$in': user } };
      const userTokens6315 = await softDeleteUserTokens(userTokensFilter7734, updateBody);
      const userTokensFilter0075 = { 'addedBy': { '$in': user } };
      const userTokens2129 = await softDeleteUserTokens(userTokensFilter0075, updateBody);
      const userTokensFilter8138 = { 'updatedBy': { '$in': user } };
      const userTokens7512 = await softDeleteUserTokens(userTokensFilter8138, updateBody);
      const roleFilter2417 = { 'addedBy': { '$in': user } };
      const role8233 = await softDeleteRole(roleFilter2417, updateBody);
      const roleFilter1947 = { 'updatedBy': { '$in': user } };
      const role8514 = await softDeleteRole(roleFilter1947, updateBody);
      const projectRouteFilter4068 = { 'addedBy': { '$in': user } };
      const projectRoute1033 = await softDeleteProjectRoute(projectRouteFilter4068, updateBody);
      const projectRouteFilter7979 = { 'updatedBy': { '$in': user } };
      const projectRoute3268 = await softDeleteProjectRoute(projectRouteFilter7979, updateBody);
      const routeRoleFilter9710 = { 'addedBy': { '$in': user } };
      const routeRole0770 = await softDeleteRouteRole(routeRoleFilter9710, updateBody);
      const routeRoleFilter3045 = { 'updatedBy': { '$in': user } };
      const routeRole8536 = await softDeleteRouteRole(routeRoleFilter3045, updateBody);
      const userRoleFilter3621 = { 'userId': { '$in': user } };
      const userRole6827 = await softDeleteUserRole(userRoleFilter3621, updateBody);
      const userRoleFilter5169 = { 'addedBy': { '$in': user } };
      const userRole8347 = await softDeleteUserRole(userRoleFilter5169, updateBody);
      const userRoleFilter9667 = { 'updatedBy': { '$in': user } };
      const userRole6309 = await softDeleteUserRole(userRoleFilter9667, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter6664 = { 'roleId': { '$in': role } };
      const routeRole5698 = await softDeleteRouteRole(routeRoleFilter6664, updateBody);
      const userRoleFilter6353 = { 'roleId': { '$in': role } };
      const userRole0967 = await softDeleteUserRole(userRoleFilter6353, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter7765 = { 'routeId': { '$in': projectroute } };
      const routeRole2928 = await softDeleteRouteRole(routeRoleFilter7765, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
