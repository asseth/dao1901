contract Ballot {

    struct Voter {
        uint weight;
        bool voted;
        uint8 vote;
    }
    struct Proposal {
        string question;
        uint yes;
        uint no;
    }

    address chairperson;
    mapping(address => Voter) voters;
    Proposal[] proposals;

    // Create a new ballot with $(_numProposals) different proposals.
    // Ici il faut une sécurité pour le bureau, pas exemple remplacer chairperson par "secrétraire"
    function Ballot(uint8 _numProposals) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        proposals.length = _numProposals;
    }

    // Give $(voter) the right to vote on this ballot.
    // May only be called by $(chairperson).
    // a la place du contrôle sur le chairperson il faut que le right to vote 
    // ne soit donné qu'au member en regle sur leur cotisationµ
    // ça semble compliqué autant commencé par "tous les membres peuvent voter"
    // Attention ce n'est pas sûr que "voter" puisse recevoir une liste d'adresse
    // issue d'un mapping; cf fonction "vote" infra
    function giveRightToVote(address voter) {
        if (msg.sender != chairperson || voters[voter].voted) return;
        voters[voter].weight = 1;
    }

    // Delegate your vote to the voter $(to). => OSEF ?
    //function delegate(address to) {
      //  Voter sender = voters[msg.sender]; // assigns reference
        //if (sender.voted) return;
        //while (voters[to].delegate != address(0) && voters[to].delegate != msg.sender)
          //  to = voters[to].delegate;
        //if (to == msg.sender) return;
        //sender.voted = true;
        //sender.delegate = to;
        //Voter delegate = voters[to];
        //if (delegate.voted)
          //  proposals[delegate.vote].voteCount += sender.weight;
        //else
          //  delegate.weight += sender.weight;
    //}

    // Give a single vote to proposal $(proposal).
    function vote(uint8 proposal, bool choice) {
        Voter sender = voters[msg.sender];
        //c'est peut être plus simple de faire un contrôle "msg sender" est sur le mapping des membres
        if (sender.voted || proposal >= proposals.length) return;
        sender.voted = true;
        //ici donc les proposals ne sont que des Oui/non 
        sender.vote = proposal;
        if (choice) {
            proposals[proposal].yes += sender.weight;
        } else {
            proposals[proposal].no += sender.weight;
        }
    }

    function winningProposal(uint proposal) constant returns (string status) {
        if ((proposals[proposal].yes + proposals[proposal].no) > 50) { 
            if (proposals[proposal].yes > proposals[proposal].no) {
                return "Proposition accepted";  
            } else {
                return "Proposition refused"; 
            }
        }
    }
    function getNumberVote(uint proposal) constant returns (uint number) {
        if ((proposals[proposal].yes + proposals[proposal].no) > 50) { 
            if (proposals[proposal].yes > proposals[proposal].no) {
                return proposals[proposal].yes;  
            } else {
                return proposals[proposal].no; 
            }
        }
    }
}
