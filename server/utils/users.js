/* class Person {
    constructor (name, age){
        this.name= name;
        this.age=age;
    }
    getUserDescription(){
        return 
    }
}

var me = new Person('sai',25);
console.log(me.name);
console.log(me.age); */

class Users{
    constructor () {
        this.users=[];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users = this.users.concat(user);
        return user;
    }
    removeUser (id) {
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter( (user) => user.id !== id);
        }

        return user;

    }
    getUser(id){
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room)
        var namesArray = users.map((user)=> user.name);

        return namesArray;
    }
}


module.exports={Users};