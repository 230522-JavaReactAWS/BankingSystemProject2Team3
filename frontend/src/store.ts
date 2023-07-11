export const state:any = {
    JWT:"",

    //this is an example of how you might store a User object (after parsing the JWT)
    user: {
        userId:0,
        username:"",
        firstName:"",
        lastName:""
    },

    isRegistered: false,

    //maybe you want to store an Array of all the user accounts
    accounts:[]
}