import { SlashCommandBuilder } from "@discordjs/builders";
import { fetchStarkNet, SelectorName } from './starknet';
import { StarkNetCall } from '../../../types'
import { toBN } from 'starknet/dist/utils/number';

const req: StarkNetCall = {
    contractAddress: "0x29317ae2fccbb5ce0588454b8d13cf690fd7318a983cf72f0c9bf5f02f4a465",
    calldata: ["2"],
    function: "get_module_address"
}

export = {
    data: new SlashCommandBuilder()
        .setName("city_health")
        .setDescription("Gets the Divine city health"),
    async execute(message: any) {
        fetchStarkNet(req)
            .then((contract: any) => {
                fetchStarkNet({
                    contractAddress: contract.result[0],
                    calldata: ["3"],
                    function: SelectorName.getMainHealth
                }).then((health: any) => {
                    console.log(health.result[0])
                    message.channel.send(`Ser, The Divine cities health is ${toBN(health.result[0]) / 100}`);
                })
            })
            .catch((error: any) => message.channel.send(error.message));
    },
};