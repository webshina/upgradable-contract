// test/Box.js

import { expect } from "chai";
import { ethers } from "hardhat";
import { Box, Box__factory } from "../typechain-types";

// Load dependencies

let Box: Box__factory;
let box: Box;

// Start test block
describe("Box", function () {
  beforeEach(async function () {
    Box = await ethers.getContractFactory("Box");
    box = await Box.deploy();
    await box.waitForDeployment();
  });

  // Test case
  it("retrieve returns a value previously stored", async function () {
    // Store a value
    const res = await box.store(42);
    console.log("res", res);
    const tx = await res.wait();
    console.log("tx", tx);

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    const retrievedValue = await box.retrieve();
    console.log("retrievedValue", retrievedValue);
    const stringRetrievedValue = retrievedValue.toString();
    console.log("stringRetrievedValue", stringRetrievedValue);
    expect(stringRetrievedValue).eq("42");
  });
});
