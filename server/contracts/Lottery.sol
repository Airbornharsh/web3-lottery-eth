// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
  address public manager;
  uint256 public entryFee;
  uint256 public numberOfWinners;
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

  constructor(uint256 _entryFee, uint256 _numberOfWinners) {
    manager = msg.sender;
    entryFee = _entryFee;
    numberOfWinners = _numberOfWinners;
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

  function startLottery(uint256 duration) public onlyManager {
    require(lotteryState == LotteryState.CLOSED, 'Lottery is already open');

    lotteryState = LotteryState.OPEN;
    lotteryEndTime = block.timestamp + duration;

    emit LotteryStarted(duration);
  }

  function enterLottery(string memory name) public payable onlyWhenOpen {
    require(msg.value == entryFee, 'Incorrect entry fee');
    participants.push(Participant(msg.sender, name));

    emit LotteryEntered(msg.sender, name);
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
    require(participants.length >= numberOfWinners, 'Not enough participants');

    for (uint256 i = 0; i < numberOfWinners; i++) {
      uint256 index = getRandomNumber() % participants.length;
      winners.push(participants[index].participantAddress);
      payable(participants[index].participantAddress).transfer(entryFee);
      participants[index] = participants[participants.length - 1];
      participants.pop();
    }

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
}
