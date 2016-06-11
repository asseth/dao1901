contract Dao1901 {
    
    enum RoleList { secretary, president, treasurer, member } // Role Available in the DAO

    struct Member {
        address key;
        bool active; // MONEY OR NOT !!!
        RoleList role;
    }
    
    mapping(address => Member) members;
    
    modifier isRole(RoleList role) {
        if (members[msg.sender].role != role) throw;
        _
    }
    

    function Dao1901(address _secretaire, address _president, address _tresorier){
        setBureau(_secretaire,_president,_tresorier);
    }
    
    // TO DO : Implement a real democracy
    function setBureau(address _secretaire, address _president, address _tresorier) isRole(RoleList.president) {
        members[_president].role = RoleList.president;
        members[_secretaire].role = RoleList.secretary;
        members[_tresorier].role = RoleList.treasurer;
    }
}