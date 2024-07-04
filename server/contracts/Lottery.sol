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

  address[] public participants;
  uint256 public noOfWinners;
  address[] public winners;

  event LotteryStarted(uint256 duration);
  event LotteryEntered(address indexed participant);
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

  function startLottery(
    uint256 _duration,
    uint256 _noOfWinners
  ) public onlyManager {
    require(lotteryState == LotteryState.CLOSED, 'Lottery is already open');

    lotteryState = LotteryState.OPEN;
    lotteryEndTime = block.timestamp + _duration;
    noOfWinners = _noOfWinners;

    emit LotteryStarted(_duration);
  }

  function enterLottery() public payable onlyWhenOpen {
    require(msg.value == entryFee, 'Incorrect entry fee');
    participants.push(msg.sender);

    emit LotteryEntered(msg.sender);
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
      );
  }

  function pickWinners() public onlyManager {
    require(lotteryState == LotteryState.OPEN, 'Lottery is not open');
    require(noOfWinners <= participants.length, 'Not enough participants');
    require(block.timestamp >= lotteryEndTime, 'Lottery is still ongoing');

    if (participants.length == 0) {
      lotteryState = LotteryState.CLOSED;
      return;
    }

    for (uint256 i = 0; i < noOfWinners; i++) {
      uint256 index = getRandomNumber() % participants.length;
      winners.push(participants[index]);
      payable(participants[index]).transfer(
        address(this).balance / noOfWinners
      );

      participants[index] = participants[participants.length - 1];
      participants.pop();
    }

    lotteryState = LotteryState.CLOSED;

    emit WinnersPicked(winners);
    // Reset the participants array for the next round
    delete participants;
  }

  function forcePickWinners() public onlyManager {
    require(lotteryState == LotteryState.OPEN, 'Lottery is not open');
    require(noOfWinners <= participants.length, 'Not enough participants');

    for (uint256 i = 0; i < noOfWinners; i++) {
      uint256 index = getRandomNumber() % participants.length;
      winners.push(participants[index]);
      payable(participants[index]).transfer(
        address(this).balance / noOfWinners
      );

      participants[index] = participants[participants.length - 1];
      participants.pop();
    }

    lotteryState = LotteryState.CLOSED;

    emit WinnersPicked(winners);

    // Reset the participants array for the next round
    delete participants;
  }

  function getParticipants() public view returns (address[] memory) {
    return participants;
  }

  function getNoOfWinners() public view returns (uint256) {
    return noOfWinners;
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

  function resetLottery() public onlyManager {
    lotteryState = LotteryState.CLOSED;
    lotteryEndTime = 0;
    noOfWinners = 0;
    delete winners;
    delete participants;
  }
}
