contract Dao1901 {

    enum RoleList { founder, secretary, president, treasurer, member } // Role Available in the DAO

    struct Member {
        address key;
        bool payed;
        bool canVote;
        RoleList role;
    }

    mapping(address => Member) members;

    bool created;

    modifier isRole(RoleList role) {
        if (members[msg.sender].role != role) throw;
    }
    modifier isAdmin() {
        if (members[msg.sender].role != RoleList.founder ||
            members[msg.sender].role != RoleList.secretary || 
            members[msg.sender].role != RoleList.president ||
            members[msg.sender].role != RoleList.president) throw;
    }


    function Dao1901(){
      members[msg.sender].role = RoleList.founder;
    }

    // TO DO : Implement a real democracy
    function setBureau(address _secretary, address _president, address _treasurer) isRole(RoleList.founder) {

        if(created == true) throw;

        members[_president].role = RoleList.president;
        members[_secretary].role = RoleList.secretary;
        members[_treasurer].role = RoleList.treasurer;

        created = true;

    }
    
    // function createMember(address _address, bool payed, bool vote) isAdmin() {
    //     members[_address].canVote = vote;
    //     members[_address].role = RoleList.member;
    //     members[_address].key = _address;
    //     members[_address].payed = payed;
    // }
    
    // function createBooleanVote(string questions) isRole(RoleList.president){
    //     votes[id].questions = questions;
    //     votes[id].end = "need to find a systeme"
    // }
}