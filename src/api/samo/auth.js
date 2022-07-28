import axios from ".";

export default {
    register: (body) => axios.get("incoming/export/default.php?samo_action=auth", {
        login: "ContinenTashtXML",
        passwordDigest: 'DfuUuLNhnl13Uu%2FSkJuQYZ9%2B9cr6vmlZ3W9vjPAywgRY7c9elyMp9GHRmwsN%2FPKzCyhacrhHM9Po2JLV1gHgRQ%3D%3D'
    }),
    currentStamp:()=>axios.get("incoming/export/default.php?samo_action=reference&form=http://samo.travel&type=currentstamp")
};