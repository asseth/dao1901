contract Dao1901 {

    address public funder;
    address public secretaire;
    address public president;
    address public tresorier;

    modifier onlyFunder() { 
        if (msg.sender != funder) throw;
        _
    }

    function Dao1901(){
        funder = msg.sender;
    }

    function setBureau(address _secretaire, address _president, address _tresorier) onlyFunder{
        secretaire=_secretaire;
        president=_president;
        tresorier=_tresorier;
    }
}