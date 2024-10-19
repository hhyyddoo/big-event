import request from "@/utils/request";
//添加文章
export function addArticleApi(data) {
    return request.post("/article", data);
}
//修改文章信息
export function editArticleApi(data) {
    return request.put("/article", data);
}
//更新密码
export function updatePasswordApi(data) {
    return request.patch("/user/updatePwd", data);
}
//更新用户信息
export function updateUserInfoApi(data) {
    return request.put("/user/update", data);
}
//更新分类
export function updataCategoryApi(data) {
    return request.put("/category", data);
}
//删除分类
export function deleteCategoryApi(id) {
    return request.delete(`/category/${id}`);
}

//获取分类列表
export const getlist = () => {
    return request.get("/category");
};
//获取文章列表
export const addCategoryApi = (data) => {
    return request.post("/category", data);
}
//获取文章列表
export const getArticleListApi = (params) => {
    return request.get("/article", {
        params: {
            ...params,
        }
    });
}
//删除文章
export const deleteArticleApi = (id) => {
    return request.delete(`/article/${id}`);
}

