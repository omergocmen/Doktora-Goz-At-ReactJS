import axios from "axios";

const baseAxiosInterceptors = axios.create({
    baseURL: "http://localhost:3000/api/",
});

baseAxiosInterceptors.interceptors.request.use(
    (response) => {
        const token = localStorage.getItem("userToken");
        response.headers = { Authorization: `${token}` };
        return response;
    },
    (error) => {
        throw new Error(error.response.data.message);
    }
);

baseAxiosInterceptors.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status == 401) {
            throw Error("Yetkisiz erişim, bu işlemi yapmak için yetkilendirme talebinde bulunun");
        } else if (error.response.status == 400) {
            throw Error("Girdilerin doğru olduğundan emin olunuz");
        } else if (error.response.status == 500) {
            throw Error("Sunucu kaynaklı hata");
        } else if (error.response.status == 404) {
            throw Error("İstek doğru şekilde iletilemedi");
        }else if(error.response.status==422){
            throw Error("Girdilerin doğru olduğundan emin olunuz");
        }
        throw Error("Upss! bir hata ile karşılaştık");
    }
);
export default baseAxiosInterceptors;
