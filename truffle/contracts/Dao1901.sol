contract Dao1901 {

    enum RoleList { founder, secretary, president, treasurer, member } // Role Available in the DAO

    struct Member {
        uint memberSince;
        bool payed;
        bool canVote;
        RoleList role;
    }
    
    Member[] public members
    mapping(address => uint) public memberId;

    bool created;

    modifier isRole(RoleList role) {
        if (members[msg.sender].role != role) throw;
    }
    modifier isAdmin() {
        if (members[msg.sender].role != RoleList.founder ||
            members[msg.sender].role != RoleList.secretary || 
            members[msg.sender].role != RoleList.treasurer ||
            members[msg.sender].role != RoleList.president) throw;
    }


    function Dao1901(address _secretary, address _president, address _treasurer){
        createMember(_secretary, true, true);
        memberId[_secretary]
        createMember(_president, true, true);
        createMember(_treasurer, true, true);
    }

    // TO DO : Implement a real democracy
    function setBureau(address _secretary, address _president, address _treasurer) isRole(RoleList.founder) {

        if(created == true) throw;
        

        created = true;
    }
    function getMembers() {
        
    }
    
    function createMember(address _address, bool _payed, bool _vote) isAdmin() {
        memberId[_address] = members.length;
        id = members.length++;
        members[id] = Member({
            canVote: _vote, 
            role: RoleList.member, 
            memberSince: now, 
            payed: payed
        });
    }
    
    // function createBooleanVote(string questions) isRole(RoleList.president){
    //     votes[id].questions = questions;
    //     votes[id].end = "need to find a systeme"
    // }
}
