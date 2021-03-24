const prompt = require('prompt-sync')();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying phase 2 fundraising with the account:",
    await deployer.getAddress()
  );

  const tokenAddress = prompt('Staking token address? ');

  console.log('Staking token address', tokenAddress);

  prompt('If happy, hit enter...');

  const LaunchPoolFundRaisingWithVesting = await ethers.getContractFactory("LaunchPoolFundRaisingWithVesting");

  const staking = await LaunchPoolFundRaisingWithVesting.deploy(
    tokenAddress
  );

  await staking.deployed();

  console.log('Phase 2 deployed at', staking.address);

  console.log('Finished!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });