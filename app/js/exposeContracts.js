import {Dao1901Members, web3} from '../../contracts/Dao1901Members.sol';
import {Dao1901Votes} from '../../contracts/Dao1901Votes.sol';

// Expose web3 globally
window.web3 = web3;

// Expose Dao1901Members globally
window.Dao1901Members = Dao1901Members;

// Expose Dao1901Votes globally
window.Dao1901Votes = Dao1901Votes;
