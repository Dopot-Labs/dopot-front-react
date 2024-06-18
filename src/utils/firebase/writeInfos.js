import { db, getIdentity, init } from "./firebaseInit"
import { getRecoil, setRecoil } from 'recoil-nexus';
import { addressState, providerState, progettiState } from '../../recoilState';
import { genproj, bundlrFund, bundlrAdd, contrattoProjectAddTier, initialiseBundlr, webIrys } from "../genproj"
import { getProvider, provider } from "./retriveInfo";
import addressFundingToken  from '../../abi/fundingToken/address.js';
import addressDpt from '../../abi/dpt/address.js';
import { downloadProjects } from "./retriveInfo";
import * as PushAPI from '@pushprotocol/restapi'; // prod/staging
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const abiProject = require('../../abi/project/1.json');
const abiFundingToken = require('../../abi/fundingToken/1.json');
const abiDpt = require('../../abi/dpt/1.json');
const { ethers } = require("ethers");

const pushMainnetAddress = "0xd52b78d9ba494e5bdcc874dc3c369f2735e24fb3"; //should be the same as polygon, lowercase
const pushPolygonAddress = "0x340cb0AA007F2ECbF6fCe3cd8929a22429893213";
const env = "staging";


async function optInNotifications() {
  const signer = getRecoil(providerState).getSigner();
  const address = await signer.getAddress();
  const subscriptions = await PushAPI.user.getSubscriptions({
    user: `eip155:42161:${address}`, // user address in CAIP
    env
  });
  if(!subscriptions.some(r => r.channel === pushMainnetAddress))
  await PushAPI.channels.subscribe({
    signer,
    channelAddress: 'eip155:42161:' + pushPolygonAddress, // channel address in CAIP
    userAddress: 'eip155:42161:' + address, // user address in CAIP
    onSuccess: () => {
      console.log('opt in success');
    },
    onError: (e) => {
      console.error(e);
    },
    env: 'staging'
  })
}

async function getPushChatUser() {
  const signer = getRecoil(providerState).getSigner();
  const address = await signer.getAddress();
  let user = await PushAPI.user.get({
    account: `eip155:${address}`,
    env,
  });
  ;
  return user ? user : await PushAPI.user.create({
    signer,
    env
  });
}

async function pushChatSend(pushUser, projectCreatorAddress, messageContent) {
  const signer = getRecoil(providerState).getSigner();
  //const address = await signer.getAddress();

  const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: pushUser.encryptedPrivateKey, 
    signer
  });
  const params = {
    messageContent,
    messageType: 'Text',
    receiverAddress: `eip155:${projectCreatorAddress}`,
    signer,
    pgpPrivateKey: pgpDecryptedPvtKey,
    env
  }
  const response = await PushAPI.chat.send(params);
  console.dir(response);
}

export async function addproj(inputs, t) {
  const address = await getProvider();
  await init();
  setRecoil(providerState, provider);
  setRecoil(addressState, address);
  !webIrys && await initialiseBundlr(getRecoil(providerState));
  let domanda = [];
  Object.keys(inputs).forEach(key => {
    if (key.startsWith("domanda")) {
      domanda.push(inputs[key]);
      delete inputs[key]; 
    }
  });
  
  inputs.domanda = domanda;

  console.log("Adding project")
  inputs.addressCreator = address
  let identity = await getIdentity(t)
  console.dir(identity)
  await bundlrFund();
  identity.linkedAccount = identity.address
  inputs.address = await genproj(inputs);
  async function updateListFiles(listFiles, contentType) {
    const updatedElements = await Promise.all(
      listFiles.map(async (element) => {
        if(element.buff) element = element.buff;
        const { id } = await bundlrAdd(element, { 
          name: "Content-Type", 
          value: contentType 
        });
        return id;
      })
    );
    return updatedElements;
  }
  
  let inputKeys = [
    { key: 'documentazioneListFiles', contentType: 'application/pdf' },
    { key: 'fotoProdotto1ListFiles', contentType: 'image/' + inputs.fotoProdotto1ListFiles[0].fileExtension },
    { key: 'logoAziendaListFiles', contentType: 'image/png' },
  ];
  inputs.fotoProdotto2ListFiles && inputKeys.push({ key: 'fotoProdotto2ListFiles', contentType: 'image/' + inputs.fotoProdotto2ListFiles[0].fileExtension });
  inputs.fotoProdotto3ListFiles && inputKeys.push({ key: 'fotoProdotto3ListFiles', contentType: 'image/' + inputs.fotoProdotto3ListFiles[0].fileExtension });
  inputs.fotoProdotto4ListFiles && inputKeys.push({ key: 'fotoProdotto4ListFiles', contentType: 'image/' + inputs.fotoProdotto4ListFiles[0].fileExtension });

  //await bundlrFund();
  for (const input of inputKeys) {
    inputs[input.key] = await updateListFiles(inputs[input.key], input.contentType);
  }
  const inputsNoTiers = {...inputs};
  inputsNoTiers.imageNftDefListFiles = []
  try{
    const tiers = await contrattoProjectAddTier(inputs);
    inputsNoTiers.imageNftDefListFiles = tiers;
    if(typeof inputsNoTiers.giorniCampagna === 'number') inputsNoTiers.giorniCampagna = inputsNoTiers.giorniCampagna.toString();
    console.dir(inputsNoTiers);
    const result = await db.set(inputsNoTiers, "projects", inputsNoTiers.address, identity );
    console.log(result);
    await optInNotifications();

    await downloadProjects(t);
  } catch (e) {
    console.log(e)
  }
  
}

export async function addFavorites(addressProject, t) {
  let address = await getProvider();
  address = address.toLowerCase();
  let identity = await getIdentity(t)
  //identity.linkedAccount = address
  //identity.signer = address
  //identity.address = address
  try {
    let result =  await db.cget("users", ["addressUser"], ["addressUser", "==", address]);
    if(!result[0] || !result[0].data){
      const obj = {addressUser: address, addressProjects: [ addressProject ], shippingNft: {}, projectStakes: []}
      await db.set(obj, "users", address, identity)
    }
    else{
      let addressProjects = result[0].data.addressProjects;
      addressProjects && addressProjects.includes(addressProject) ? addressProjects.splice(addressProjects.indexOf(addressProject), 1) : addressProjects.push(addressProject);
      await db.update(result[0].data, "users", result[0].id, identity)
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addProjectStake(addressProject, amount, t) {
  let address = await getProvider();
  address = address.toLowerCase();
  let identity = await getIdentity(t)
  console.dir(identity);
  //identity.linkedAccount = address
  //identity.signer = address
  //identity.address = address
  try {
    const newStake = { timestamp: new Date().getTime(), amount, address: addressProject }
    let result =  await db.cget("users", ["addressUser"], ["addressUser", "==", address]);
    if(!result[0] || !result[0].data){
      const obj = {addressUser: address, addressProjects: [], shippingNft: {}, projectStakes: [ newStake ]};
      console.dir(obj);
      await db.set(obj, "users", address, identity)
    }
    else{
      let projectStakes = result[0].data.projectStakes;
      if(projectStakes) projectStakes.push(newStake);
      else result[0].data.projectStakes = [ newStake ];
      console.log(result[0].data)
      await db.update(result[0].data, "users", result[0].id, identity)
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addShippingDetailsNft(projectAddress, tokenId, shippingDetails, title) {
  const result =  await db.get("projects", ["address"], ["address", "==", projectAddress]);
  const pushChatUser = await getPushChatUser();
  await pushChatSend(pushChatUser, result[0].addressCreator, `Project ${title}, Token Id ${tokenId}, Shipping Details ${shippingDetails}` )
}

export async function refundNft(project, tokenId, t, navigate) {
  console.log(project, tokenId);
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  try {
    const tx = await pWithSigner.refund(tokenId);
    await tx.wait(1);
    setRecoil(progettiState, null);
    navigate("/loading");
  } catch (e) {
    console.error(e);
  }
}

async function allowDptPay(signer, projectContract, project, amount){
  const address = await getProvider();
  if(await projectContract.dptAddressesSet()){
    const infinite = /*amount ||*/ "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    const dptContract = new ethers.Contract(addressDpt, abiDpt, signer);
    const fWithSigner = dptContract.connect(signer);
    const allowance = await dptContract.allowance(address, project);
    if (allowance.lt(infinite)){
      const tx = await fWithSigner.approve(project, infinite);
      await tx.wait(1);
    } else console.log("Skipping dpt allowance")
  } else console.log("Skipping dpt allowance")
}

export async function getPWithSigner(project){
  const provider = getRecoil(providerState);
  const signer = provider.getSigner();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  return projectContract.connect(signer);
}

export async function getWithdrawalFees(pWithSigner){
  const fees = (await pWithSigner.getWithdrawalFee()).add((await pWithSigner.getStakingRewards()));
  console.log(fees.toString());
  return fees;
}

export async function withdraw(project) {
  const provider = getRecoil(providerState);
  const signer = provider.getSigner();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const pWithSigner = projectContract.connect(signer);

  /*const amount = await getWithdrawalFees(pWithSigner);
  const dptContract = new ethers.Contract(addressDpt, abiDpt, signer);
  console.log((await dptContract.balanceOf(await getProvider())).toString())
  console.log(amount.toString())
  console.log( (amount.lte(await dptContract.balanceOf(await getProvider())) ));*/

  if(await pWithSigner.dptAddressesSet()) {
    const amount = await getWithdrawalFees(pWithSigner);
    await allowDptPay(signer, projectContract, project, amount);
  }
  try {
    await pWithSigner.withdraw(); // still asking me to pay way to much dpt
  } catch (e) {
    console.error(e);
  }
}

export async function stakeProject(project, amount, t) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  await allowDptPay(signer, projectContract, project, amount);
  try {
    const tx = await pWithSigner.stake(ethers.utils.parseUnits(amount.toString(), 18));
    await tx.wait(1);
    await addProjectStake(project, amount, t) 
  } catch (e) {
    console.error(e);
  }
}

export async function unstakeProject(project) {
  const provider = getRecoil(providerState);
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  try {
    const tx = await pWithSigner.unstake();
    await tx.wait(1);
  } catch (e) {
    console.error(e);
  }
}

export async function postpone(project) {
  const provider = getRecoil(providerState);
  const address = await getProvider();
  const projectContract = new ethers.Contract(project, abiProject, provider);
  const signer = provider.getSigner()
  const pWithSigner = projectContract.connect(signer);
  await allowDptPay(signer, projectContract, project);
  try {
    await pWithSigner.postponeDeadline();
  } catch (e) {
    console.error(e);
  }
}

export async function addInvestment(pAddress, numTier, price, title, t) {
  const amount = ethers.utils.parseEther(price);
  numTier--;
  let addressLogged=getRecoil(addressState)
  try {
    const address = await getProvider();
    const provider = getRecoil(providerState);
    const signer = provider.getSigner();
    const projectContract = new ethers.Contract(pAddress, abiProject, signer);
    const pWithSigner = projectContract.connect(signer);
    const fundingTokenContract = new ethers.Contract(addressFundingToken, abiFundingToken, signer);
    const fWithSigner = fundingTokenContract.connect(signer);
    const allowance = await fundingTokenContract.allowance(address, pAddress);
    if (!allowance.gte(price)){
      const tx = await fWithSigner.approve(pAddress, amount);
      await tx.wait(1);
    }
    const tx = await pWithSigner.invest(numTier);
    await tx.wait(1);
    const shippingDetails = window.prompt(t("shippingDetails"));
    await addShippingDetailsNft(pAddress, title, shippingDetails, title);
    await optInNotifications();
    await downloadProjects(t);
  } catch (e) {
    console.error(e);
  }
}