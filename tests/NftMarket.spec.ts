import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { NftMarket } from '../wrappers/NftMarket';
import '@ton/test-utils';
import { NftItem } from '../wrappers/NftItem';
import { NftCollection } from '../build/NftMarket/tact_NftCollection';

describe('NftMarket', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftMarket: SandboxContract<NftMarket>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        nftMarket = blockchain.openContract(await NftMarket.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await nftMarket.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftMarket.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nftMarket are ready to use
    });

    it("should mint nft",async() =>{
        await nftMarket.send(deployer.getSender(), {
            value: toNano("0.3")
        }, 'Mint')
        
        const nftItemAddress = await nftMarket.getGetNftAddressByIndex(0n);
        const nftItem: SandboxContract<NftItem> = blockchain.openContract(NftItem.fromAddress(nftItemAddress));

        let nftItemData = await nftItem.getGetItemData()


        console.log("old owner - ", nftItemData.owner)

        const nftCollectionsData = await nftMarket.getGetCollectionData()

        console.log(nftCollectionsData.collection_content.beginParse().loadStringTail())

        const user = await blockchain.treasury("user");

        await nftItem.send(deployer.getSender(), {
            value: toNano("0.2")
        },{
            $$type: 'Transfer',
            new_owner:user.address,
            query_id: 0n
        })

        nftItemData = await nftItem.getGetItemData();
        
        console.log("new owner - " ,nftItemData.owner);

    
    })
});
