const prompt = require('prompt-sync')();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying staking contract with guild using the account:",
    await deployer.getAddress()
  );

//   * Name: THT
//   * Symbol: THT
//   * Decimals: 18
//   * Rewards: 58,823.5
//   * Limit: NO LIMIT
//   * Start: 12141500 (30th Mar 4pm)
//   * End: 12154500 (1st Apr 4pm ish)

  const tokenAddress = prompt('Token address? '); // 0x6f9Ca03F12591DbEf0DEEd56A0d7FebAce1288e3
  const maxRewards = prompt('Max rewards? '); // 58823.5
  const startBlock = prompt('Start block? '); // 12141500 - https://etherscan.io/block/countdown/12141500
  const endBlock = prompt('End block? '); // 12154500 - https://etherscan.io/block/countdown/12154500

  console.log('Token address', tokenAddress);
  console.log('Max rewards', maxRewards);
  console.log('Start block', startBlock);
  console.log('End block', endBlock);

  prompt('If happy, hit enter...');

  const LaunchPoolStakingFactory = await ethers.getContractFactory("LaunchPoolStakingWithGuild");

  const staking = await LaunchPoolStakingFactory.deploy(
    tokenAddress,
    ethers.utils.parseEther(maxRewards),
    startBlock,
    endBlock
  );

  await staking.deployed();

  console.log('Staking deployed at', staking.address);

  console.log('Finished!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });