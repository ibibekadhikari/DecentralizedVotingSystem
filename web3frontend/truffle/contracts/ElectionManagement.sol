pragma solidity ^0.8.15;
import "./Ownable.sol";

contract VotersManagement is Ownable{
    uint votercounter=1;
    event VoterUpdate (string _name,uint _v_no,bool _is_voted,string _r_date,uint _c_num);
        struct voter{
        string v_name;
        uint v_no;
        bool is_voted;
        uint token;
        string reg_date;
        uint card_num;
    }
    mapping(uint => voter)  voters; 

    function addVoter(string memory _name,string memory _r_date,uint _c_num, uint _token) public onlyOwner{
        require((voters[_token].token) <= 0,"voter token already exist");
        require((voters[_token].card_num) <= 0,"voter with this card number already exist");
        voters[_token].v_name = _name;
        voters[_token].v_no = votercounter;
        voters[_token].is_voted = false;
        voters[_token].token = _token;
        voters[_token].reg_date = _r_date;
        voters[_token].card_num = _c_num;
        votercounter+=1;
        emit VoterUpdate(voters[_token].v_name,voters[_token].v_no,voters[_token].is_voted,voters[_token].reg_date,voters[_token].card_num);
    }

    receive () external payable {         
    }
    event EventAvailableBalance(uint Total);
    function checkAvailabelBalance() public onlyOwner {
        emit EventAvailableBalance(address(this).balance);
    }

    function destroySmartContract(address payable _to) public onlyOwner{
        selfdestruct(_to);
        
    } 

}



contract ElectionManagement is VotersManagement{

    event EventCreateCandidate(string election_name,string party_name,string candidate_name,string candidate_post,uint candidate_number);
    event EventCreateparty(string election_name,string party_name,uint party_id);
    event EventCreateElection(string election_name,uint election_id);
    event EventVoted(string election_name,bool vote_status);

uint c_count=0;
    struct candidate{
        string c_name;
        string c_post;
        uint c_id;
        uint c_votes;
    }

uint p_count=0;
    struct party{
        string p_name;
        uint p_votes;
        uint p_id;
        uint candidatecount;
        mapping(uint => candidate) candidates;
    }

uint e_count=0;
    struct election{
        string e_name;
        uint t_votes;
        bool isRunning;
        uint e_id;
        uint p_Count;
        mapping(uint => party) parties;

    }

mapping (uint => election) elections;

        function checkElectionExist(string memory _name) private view returns(bool){
        for(uint i=0;i<=e_count;i++){
            if(keccak256(abi.encodePacked((elections[i].e_name))) == keccak256(abi.encodePacked((_name)))){
                return true;
            }
        }
        return false;
    }

    function registerElection(string memory _e_name) public onlyOwner{
        require(!checkElectionExist(_e_name),"election name already exist");
        elections[e_count].e_name = _e_name;
        elections[e_count].isRunning = false;
        elections[e_count].t_votes = 0;
        elections[e_count].e_id = e_count;
        elections[e_count].p_Count = 0;
        emit EventCreateElection(_e_name,e_count);
        e_count += 1;
    }

    function indexOfElection(string memory _name) private view returns(uint){
        for(uint i=0;i<=e_count;i++){
            if(keccak256(abi.encodePacked((elections[i].e_name))) == keccak256(abi.encodePacked((_name)))){
                return i;
            }
        }
        revert('election name not found');
    }

    function checkPartyExist(uint pindex,string memory p_name) private view returns(bool){
        for(uint i=0;i<=elections[pindex].p_Count;i++){
            if(keccak256(abi.encodePacked((elections[pindex].parties[i].p_name))) == keccak256(abi.encodePacked((p_name)))){
                return true;
            }
        }
        return false;
    }

    function indexOfParty(uint eindex,string memory p_name) private view returns(uint){
        for(uint i=0;i<=elections[eindex].p_Count;i++){
            if(keccak256(abi.encodePacked((elections[eindex].parties[i].p_name))) == keccak256(abi.encodePacked((p_name)))){
                return i;
            }
        }
        revert('party name not found');
    }


    function registerParty(string memory e_name,string memory p_name) public onlyOwner{
        uint index = indexOfElection(e_name);
        require(!checkPartyExist(index,p_name),"party name already exist");
        elections[index].parties[elections[index].p_Count].p_name = p_name;
        elections[index].parties[elections[index].p_Count].candidatecount = 0;
        elections[index].parties[elections[index].p_Count].p_votes = 0;
        elections[index].parties[elections[index].p_Count].p_id = p_count;
        emit EventCreateparty(e_name,p_name,p_count);
        elections[index].p_Count += 1;
        p_count += 1;
    }

    function checkCandidateExist(uint eindex,uint pindex,string memory _c_post) private view returns(bool){
        for(uint i=0;i<=elections[eindex].parties[pindex].candidatecount;i++){
            if(keccak256(abi.encodePacked((elections[eindex].parties[pindex].candidates[i].c_post))) == keccak256(abi.encodePacked((_c_post)))){
                return true;
            }
        }
        return false;
    }

    function indexOfCandidate(uint eindex,uint pindex,string memory _c_post) private view returns(uint){
        for(uint i=0;i<=elections[eindex].parties[pindex].candidatecount;i++){
            if(keccak256(abi.encodePacked((elections[eindex].parties[pindex].candidates[i].c_post))) == keccak256(abi.encodePacked((_c_post)))){
                return i;
            }
        }
        revert('candidate post not found');
    }

    function registerCandidate(string memory e_name,string memory p_name,string memory _c_name,string memory _c_post)public onlyOwner{
        uint eindex = indexOfElection(e_name);
        uint pindex = indexOfParty(eindex,p_name);
        require(!checkCandidateExist(eindex,pindex,_c_post),"candidate post in that party name already exist");
        elections[eindex].parties[pindex].candidates[elections[eindex].parties[pindex].candidatecount].c_name = _c_name;
        elections[eindex].parties[pindex].candidates[elections[eindex].parties[pindex].candidatecount].c_post = _c_post;
        elections[eindex].parties[pindex].candidates[elections[eindex].parties[pindex].candidatecount].c_votes = 0;
        elections[eindex].parties[pindex].candidates[elections[eindex].parties[pindex].candidatecount].c_id = c_count;
        elections[eindex].parties[pindex].candidatecount += 1;
        emit EventCreateCandidate(e_name,p_name,_c_name,_c_post,c_count);
        c_count += 1;

    }

    // function checkcandidateIndex(string memory e_name,string memory p_name,string memory _c_post) public view returns(uint){
    //     uint eindex = indexOfElection(e_name);
    //     return indexOfCandidate(eindex,indexOfParty(eindex,p_name),_c_post);
    // }
// president,vice-president,secretary,treasurer,member
// uint p_pid,uint p_cid,uint vp_pid,uint vp_cid,uint s_pid,uint s_cid,uint t_pid,uint t_cid,uint m_pid,uint m_cid
    // function vote(string memory _e_name,uint p_pid,uint p_cid,uint vp_pid,uint vp_cid,uint s_pid,uint s_cid,uint t_pid,uint t_cid,uint m_pid,uint m_cid, uint _token) public onlyOwner{ 
        function vote(string memory _e_name,uint[] memory pid,uint[] memory cid,uint _token) public{
        require(voters[_token].token > 0,"voter not exist");
        require(!(voters[_token].is_voted),"voter already voted");
        uint eindex = indexOfElection(_e_name);
        // for president
        elections[eindex].parties[pid[0]].candidates[cid[0]].c_votes += 1;
        elections[eindex].parties[pid[0]].p_votes +=1;
        // for vice president
        elections[eindex].parties[pid[1]].candidates[cid[1]].c_votes += 1;
        elections[eindex].parties[pid[1]].p_votes +=1;
        // for secretary
        elections[eindex].parties[pid[2]].candidates[cid[2]].c_votes += 1;
        elections[eindex].parties[pid[2]].p_votes +=1;
        // for treasurer
        elections[eindex].parties[pid[3]].candidates[cid[3]].c_votes += 1;
        elections[eindex].parties[pid[3]].p_votes +=1;
        // for member
        elections[eindex].parties[pid[4]].candidates[cid[4]].c_votes += 1;
        elections[eindex].parties[pid[4]].p_votes +=1;

        elections[eindex].t_votes += 5;
        voters[_token].is_voted = true;
        emit EventVoted(_e_name,true);

    }

     function uint2str(uint256 _i) internal pure returns (string memory str)
{
    if (_i == 0){
    return "0";
  }
  uint256 j = _i;
  uint256 length;
  while (j != 0)
  {
    length++;
    j /= 10;
  }
  bytes memory bstr = new bytes(length);
  uint256 k = length;
  j = _i;
  while (j != 0)
  {
    bstr[--k] = bytes1(uint8(48 + j % 10));
    j /= 10;
  }
  str = string(bstr);
}

    function getVotes(string memory _e_name)public onlyOwner returns(string memory) {
        uint eindex = indexOfElection(_e_name);
        // uint pindex = indexOfParty(eindex,_p_name);
        string memory lvotes;
        // c_count=elections[eindex].parties[pindex].candidatecount;
        lvotes = '[';
        for (uint j=0;j<elections[eindex].p_Count;j++){
            lvotes = string(abi.encodePacked(lvotes,"{name:","'",elections[eindex].parties[j].p_name,"'",",votes:",uint2str(elections[eindex].parties[j].p_votes),",partyId:",uint2str(elections[eindex].parties[j].p_id),",returnValues:["));
        for(uint i=0;i<elections[eindex].parties[j].candidatecount;i++){
            lvotes=string(abi.encodePacked(lvotes,"{","name:","'",elections[eindex].parties[j].candidates[i].c_name,"'",",post:","'",elections[eindex].parties[j].candidates[i].c_post,"'",",c_id:",uint2str(elections[eindex].parties[j].candidates[i].c_id),",votes:",uint2str(elections[eindex].parties[j].candidates[i].c_votes),"},"));
        }
        lvotes = string(abi.encodePacked(lvotes,"]},"));
        }
        lvotes = string(abi.encodePacked(lvotes,"]"));
    //     return lvotes;
    // }

    return lvotes;
    }
}