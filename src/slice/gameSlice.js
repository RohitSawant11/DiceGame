import { createSlice } from "@reduxjs/toolkit";

export const MESSAGES = new Map([
  ["idle", { id: 0, msg: "Single Dice Betting Game" }],
  ["click", { id: 1, msg: "Click on a dice" }],
  ["rolling", { id: 2, msg: "Rolling the dice" }],
  ["result", { id: 3, msg: "Result" }],
]);

const gameStage = {
  idle: "idle",
  click: "click",
  rolling: "rolling",
  result: "result"
}

const initialMessage = MESSAGES.get("idle");

const initialState = {
  balance: 5,
  bets: [0, 0, 0, 0, 0, 0],
  prevBalance: 100,
  timer: 0,
  gameStagesMsg: initialMessage.msg,
  gameStagesId: initialMessage.id,
  diceResult: null,
  roundOutcome: null,
  bettingTime: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    placeBet: (state, action) => {
      const { position, amount } = action.payload;
      if (state.timer > 0 && amount > 0 && state.balance > 0) {
        state.bets[position - 1] += amount;
        state.balance -= amount;
      }
    },
    startNewRound: (state, action) => {
        if (state.balance > 0) {
        state.bets = [0, 0, 0, 0, 0, 0];
        state.roundOutcome = null;
        state.bettingTime = true;
        state.timer = 5;
        state.gameStagesMsg = MESSAGES.get("click").msg;
        state.gameStagesId = MESSAGES.get("click").id;
        state.prevBalance = state.balance === state.prevBalance ? state.prevBalance : state.balance;
      }
    },
    updateTimer: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },
    simulateDiceRoll: (state) => {
      if (state.bettingTime) {
        state.bettingTime = false;
        state.timer = 2;
        state.gameStagesId = MESSAGES.get("rolling").id;
        const roll = Math.floor(Math.random() * 6) + 1;
        state.diceResult = roll;
      }
    },
    checkResult: (state) => {
      state.timer = 5;
      state.gameStagesMsg = MESSAGES.get("result").msg;
      state.gameStagesId = MESSAGES.get("result").id;
      state.bets.forEach((bet, index) => {
        if (bet > 0 && index + 1 === state.diceResult) {
          state.balance += bet * 2;
        }
      });
      state.roundOutcome = state.balance === state.prevBalance ? "Draw" : state.prevBalance < state.balance
        ? `You won $${state.balance - state.prevBalance}!`
        : `You lost $${state.prevBalance - state.balance}`;
    },
    resetGame: () => initialState,
    updateTimerAndMsg: (state, action) => {
      switch (action.payload) {
        case gameStage.rolling:
          const message = MESSAGES.get(action.payload);
          state.gameStagesMsg = message.msg;
          state.gameStagesId = message.id;
          break;
        
        case gameStage.idle:
          state.timer = 0;
          state.gameStagesId= MESSAGES.get("idle").id;
          state.gameStagesMsg= MESSAGES.get("idle").msg;
        default:
          break;
      }
    }
  },
});

export const {
  placeBet,
  startNewRound,
  updateTimer,
  simulateDiceRoll,
  checkResult,
  updateTimerAndResult,
  resetGame,
  updateTimerAndMsg
} = gameSlice.actions;

export default gameSlice.reducer;
