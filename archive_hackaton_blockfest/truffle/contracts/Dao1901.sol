contract Dao1901 {

    enum RoleList { founder, secretary, president, treasurer, member } // Role Available in the DAO

    enum VoteState { proposed, accepted, voted, rejected }  // Accepted by "bureau", voted by members

    struct Member {
        uint memberSince;   // Registering date of a member
        bool payed;     // True if member has payed, if needed
        bool canVote;       // True if member is allowed to vote
        RoleList role;      
        address public_key; // address of the member
    }

    Member[] public members;    // Dynamic table of members (in storage)
    mapping (address => uint) public memberId;  // A mapping to find a member by it's address
    bool created;   // A dirty flag

    // Functions to query the database of members
    function getMemberSince(address addr) returns(uint memberSince){
        return members[memberId[addr]].memberSince;
    }
    function getMemberPayed(address addr) returns(bool status){
        return members[memberId[addr]].payed;
    }
    function getMemberCanVote(address addr) returns(bool status){
        return members[memberId[addr]].canVote;
    }
    function getMemberRole(address addr) returns(string role){
        if (members[memberId[addr]].role == RoleList.founder) return "Founders";
        if (members[memberId[addr]].role == RoleList.secretary) return "Secreatary";
        if (members[memberId[addr]].role == RoleList.president) return "President";
        if (members[memberId[addr]].role == RoleList.treasurer) return "Treasurer";
        if (members[memberId[addr]].role == RoleList.member) return "Members";
        // return uint(members[memberId[addr]].role);
    }
    function getMemberAdresse(uint id) returns(address addr){
        return members[id].public_key;
    }
    function getMembersLength() returns(uint size){
        return members.length;
    }

    modifier isRole(RoleList role) {
        if (memberId[msg.sender] == 0 || members[memberId[msg.sender]].role != role) throw;
        _
    }

    modifier isAdmin() {    // Checks if sender is not a normal member and exists in database == is an admin
        if (memberId[msg.sender] == 0 || members[memberId[msg.sender]].role == RoleList.member) throw;
        _
    }

    modifier hasRightToProposeOrVote() {    // 
        if (memberId[msg.sender] == 0 || members[memberId[msg.sender]].canVote == false) throw;
        _
    }

    function Dao1901(){
        members.length += 2;    // Adding two members to the table
        members[0] = Member({canVote: false, role: RoleList.member, memberSince: now, payed: false, public_key: 0}); // One fake user for the checks on the mapping to work
        members[1] = Member({canVote: false, role: RoleList.founder, memberSince: now, payed: false, public_key: msg.sender});  // The founder
        memberId[msg.sender] = 1;   // Only a real user needs an updated mapping
    }

    // Called only once by the founder
    function setBureau(address _secretary, address _president, address _treasurer) isRole(RoleList.founder) {

        if(created == true) throw;

        createMember(_secretary, true, true);
        members[memberId[_secretary]].role = RoleList.secretary;
        createMember(_president, true, true);
        members[memberId[_president]].role = RoleList.president;
        createMember(_treasurer, true, true);
        members[memberId[_treasurer]].role = RoleList.treasurer;
        
        created = true;
    }
    
    // Right to create member is owned by all admins
    // TODO : fire the founder of the admins
    function createMember(address _address, bool _payed, bool _vote) isAdmin() {
        uint id;
        memberId[_address] = id = members.length;   // Update of the mapping : new member's address to the last index of the table
        members.length++;
        members[id] = Member({
            canVote: _vote, 
            role: RoleList.member, 
            memberSince: now, 
            payed: _payed,
            public_key: _address
        });
    }

    BooleanProposal[] public voteProposals; // once validated by bureau, have to be voted by members

    struct BooleanProposal {
        string proposalContent;
        uint openSince;
        uint yes;
        uint no;
        address hasVoted[];
        mapping(address => uint) whoHasVoted; 
        bool validatedByBureau=false;
        VoteState state;
    }

    function votePreProposal(uint _id), bool vote) isAdmin(){
        uint id; // id for hasVoted[]

        // if person has has ever voted, can't vote
        // prevent multiple votes
        if( voteProposals[_id].whoHasVoted[msg.sender] != 0){ // if returns 0, never voted
            throw;
        }
        // Vote
        id=voteProposals[_id].hasVoted.length;
        voteProposals[_id].hasVoted.length++;
        voteProposals[_id].hasVoted[id]=msg.sender;
        if vote voteProposals[_id].yes++ else voteProposals[_id].no++ ;            
        
        // verify the end of the vote 
        if (voteProposals[_id].yes + voteProposals[_id].no) == 3 {
            
            if( voteProposals[_id].yes >= voteProposals[_id].no ){
                voteProposals[_id].state=validated;
            } else {
    
            }
            // Reset the votes (because state is chosen as accepted or rejected, then members can vote)
            voteProposals[_id].yes=0;
            voteProposals[_id].no=0;
        }
    }
    
    function sendProposal(string _proposalContent) hasRightToProposeOrVote(){
        uint id;
        id=voteProposals.length;
        voteProposals.length++;
        voteProposals[id].string=_proposalContent;
        voteProposals[id].openSince=now;
        voteProposals[id].state=proposed;
        voteProposals[id].hasVoted.length++; // hasVoted[0] will never contain an address (so the tests on mapping will work)
    }
}
