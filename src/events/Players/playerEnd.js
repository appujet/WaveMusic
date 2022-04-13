
module.exports = {
	name: "playerEnd",
	run: async (client, player) => {
		if (player.data.get("message") && !player.data.get("message").deleted) player.data.get("message").delete().catch(() => null);

	}
};