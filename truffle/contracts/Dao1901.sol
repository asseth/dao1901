contract Dao1901 {

    enum RoleList { founder, secretary, president, treasurer, member } // Role Available in the DAO

    struct Member {
        address key;
        bool active; // MONEY OR NOT !!!
        RoleList role;
    }

    mapping(address => Member) members;

    bool created;

    modifier isRole(RoleList role) {
        if (members[msg.sender].role != role) throw;
    }


    function Dao1901(){
      members[msg.sender] = RoleList.founder;
    }

    // TO DO : Implement a real democracy
    function setBureau(address _secretary, address _president, address _treasurer) isRole(RoleList.founder) {

        if(created == true) throw;

        members[_president].role = RoleList.president;
        members[_secretary].role = RoleList.secretary;
        members[_treasurer].role = RoleList.treasurer;

        created = true;

    }
}
