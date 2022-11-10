import { concat } from "uint8arrays";
import {create} from "ipfs"
import { blobToBase64 } from "./base64utils";

const { ethers } = require("ethers");
const { ethereum } = window;


var provider, account, address, ipfs;
async function initIPFS() {
    provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    account = provider.getSigner();
    address=await account.getAddress();

  
  
    // Create IPFS instance
    const ipfsOptions = {
      repo: 'ipfs-' + Math.random(),
      preload: {
        enabled: true,
        addresses: [ 
      '/dns4/node0.preload.ipfs.io/https',
      '/dns4/node1.preload.ipfs.io/https',
      '/dns4/node2.preload.ipfs.io/https',
      '/dns4/node3.preload.ipfs.io/https'
       ],
      },
      relay: {
        enabled: true,  // This line means your node is dialable over a Relay, but doesn't make it a relay itself
        hop: {
          enabled: true,  // `true` means your node is a relay. So if two nodes are connected to it, it should relay their dials to one another
          active: false  // `true` means your node will attempt to actively dial the requested peer. This is likely not going to work in your situation, since your nodes aren't dialable.
        }
      },
      libp2p: {
          config: {
            dht: {
              enabled: true,
              clientMode: true,
            }
          }
      }
    }

    ipfs = await create(ipfsOptions);
}

async function getAddress() {
    return address;
}
function getIPFS() {
    return ipfs;
}

async function getJSON(param) {
  const chunks = [];

  for await (const chunk of ipfs.cat( param )) {
    chunks.push(chunk);
  }

  return JSON.parse(new TextDecoder().decode(concat(chunks)).toString());
}


async function getImage(param) {
  
  
  let url;
  let b64;
  for await (const file of ipfs.cat( param )) {
    let blob = new Blob([file], {type:"image/png"})
    url = URL.createObjectURL(blob)
    b64 = await blobToBase64(blob);
    
  }
  return {url: url, base64: b64}
}



function GetAccount() {
    return account;
}


async function add(param) {
  if (param != null) {
    return await ipfs.add(param, {cidVersion: 1});
  }
    return null
}


async function addAll(params) {

  if (params != null) {
    var hash=[];
    for await (const result of ipfs.addAll(params, {cidVersion: 1})) {
      hash.push(result);
    }
    console.log(hash);
    return hash;
  }

  return null;
  
}


export default {initIPFS, add, GetAccount, getIPFS, getAddress, addAll, getJSON, getImage}


