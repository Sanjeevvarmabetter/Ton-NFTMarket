import { toNano } from '@ton/core';
import { NftMarket } from '../wrappers/NftMarket';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const nftMarket = provider.open(await NftMarket.fromInit());

    await nftMarket.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(nftMarket.address);

    // run methods on `nftMarket`
}
