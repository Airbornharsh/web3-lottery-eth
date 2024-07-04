// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
  address public manager;
  uint256 public entryFee;
  uint256 public lotteryEndTime;

  enum LotteryState {
    OPEN,
    CLOSED
  }
  LotteryState public lotteryState;

  struct Participant {
    address participantAddress;
    string name;
  }

  Participant[] public participants;
  address[] public winners;

  event LotteryStarted(uint256 duration);
  event LotteryEntered(address indexed participant, string name);
  event WinnersPicked(address[] winners);

  constructor(uint256 _entryFee) {
    manager = msg.sender;
    entryFee = _entryFee;
    lotteryState = LotteryState.CLOSED;
  }

  modifier onlyManager() {
    require(msg.sender == manager, 'Only manager can call this function');
    _;
  }

  modifier onlyWhenOpen() {
    require(lotteryState == LotteryState.OPEN, 'Lottery is not open');
    require(block.timestamp < lotteryEndTime, 'Lottery has ended');
    _;
  }

  function startLottery(uint256 _duration) public onlyManager {
    require(lotteryState == LotteryState.CLOSED, 'Lottery is already open');

    lotteryState = LotteryState.OPEN;
    lotteryEndTime = block.timestamp + _duration;

    emit LotteryStarted(_duration);
  }

  function enterLottery(string memory _name) public payable onlyWhenOpen {
    require(msg.value == entryFee, 'Incorrect entry fee');
    participants.push(Participant(msg.sender, _name));

    emit LotteryEntered(msg.sender, _name);
  }

  function getRandomNumber() private view returns (uint256) {
    return
      uint256(
        keccak256(
          abi.encodePacked(
            block.timestamp,
            block.difficulty,
            participants.length
          )
        )
      ) % participants.length;
  }

  function pickWinners() public onlyManager {
    require(lotteryState == LotteryState.OPEN, 'Lottery is not open');
    require(block.timestamp >= lotteryEndTime, 'Lottery is still ongoing');

    uint256 index = getRandomNumber() % participants.length;
    winners.push(participants[index].participantAddress);
    payable(participants[index].participantAddress).transfer(
      address(this).balance
    );
    participants[index] = participants[participants.length - 1];
    participants.pop();

    lotteryState = LotteryState.CLOSED;

    emit WinnersPicked(winners);

    // Reset the participants array for the next round
    delete participants;
  }

  function getParticipants() public view returns (Participant[] memory) {
    return participants;
  }

  function getWinners() public view returns (address[] memory) {
    return winners;
  }

  function isManager() public view returns (bool) {
    return msg.sender == manager;
  }

  function getBalance() public view onlyManager returns (uint256) {
    return address(this).balance;
  }

  function getLotteryState() public view returns (LotteryState) {
    return lotteryState;
  }

  function getLotteryEndTime() public view returns (uint256) {
    require(lotteryState == LotteryState.OPEN, 'Lottery is not open');

    return lotteryEndTime;
  }

  function getEntryFee() public view returns (uint256) {
    return entryFee;
  }

  function getManager() public view returns (address) {
    return manager;
  }
}
