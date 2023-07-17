
import './App.css';
import { Wallet } from 'ethers';
import  CoinKey from 'coinkey'; 
import { useState } from 'react';
import TronWeb from 'tronweb';
import crypto from 'crypto'

function App() {
  const [ethereumAddress, setEthereumAddress] = useState();
  const [ethereumPvtKey, setEthereumPvtKey] = useState();
  const [bitcoinAddress, setBitcoinAddress] = useState();
  const [bitcoinPvtKey, setBitcoinPvtKey] = useState();
  const [tronAddress, setTronAddress] = useState();
  const [tronPvtKey, setTronPvtKey] = useState();

  const generateAccount = async () => {
    try {
      const wallet = Wallet.createRandom();
      const obj = {
        account: wallet.address,
        // publicKey: EthCrypto.publicKeyByPrivateKey(wallet.privateKey),
        privateKey: wallet.privateKey,
      };
      return obj;
    } catch (error) {
      console.log("Error in generateAccount(): ", error);
    }
  };

  const handleEthereum = async () => {
      const wallet = await generateAccount();
      setEthereumAddress(wallet.account);
      setEthereumPvtKey(wallet.privateKey);
      console.log(wallet,"wallet");
  }

  const handleBitcoin = async () => {
    var wallet = new CoinKey.createRandom();

    console.log("SAVE BUT DO NOT SHARE THIS:", wallet.privateKey.toString('hex'));
    console.log("Address:", wallet.publicAddress);
    setBitcoinAddress(wallet.publicAddress);
    setBitcoinPvtKey(wallet.privateKey.toString('hex'));
  }

  const handleTruno = async () => {
    var privateKey = crypto.randomBytes(32).toString('hex');
    console.log("Private Key", privateKey);

    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.trongrid.io");
    const solidityNode = new HttpProvider("https://api.trongrid.io");
    const eventServer = new HttpProvider("https://api.trongrid.io");
    const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

    const wallet = await tronWeb.createAccount();
    console.log(wallet);
    setTronAddress(wallet.publicKey)
    setTronPvtKey(wallet.privateKey)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Address Generator
        </h2>
        <b>Ethereum Address</b>
        <button onClick={handleEthereum}>Ethereum address</button>
        <div>Ethereum Address: {ethereumAddress}</div>
        <div>Ethereum Address pvt key: {ethereumPvtKey}</div>
        <br/>
        <b>Bitcoin Address</b>
        <button onClick={handleBitcoin}>Bitcoin address</button>
        <div>Bitcoin Address: {bitcoinAddress}</div>
        <div>Bitcoin Address pvt key: {bitcoinPvtKey}</div>
        <br/>
        <b>Tron Address</b>
        <button onClick={handleTruno}>Tron address</button>
        <div>Tron Address: 0x{tronAddress}</div>
        <div>Tron Address pvt key: {tronPvtKey}</div>

      </header>
    </div>
  );
}

export default App;
