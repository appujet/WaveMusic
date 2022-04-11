module.exports = {
    progressbar: function (player) {
    let size = 15;
    let line = "▬";
    let slider = ":radio_button:";
    
    if (!player.current) return `${slider}${line.repeat(size - 1)}]`;
    let current = player.current.length !== 0 ? player.player.position : player.current.length;
    let total = player.current.length;
    let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
   
    if (!String(bar).includes(slider)) return `${slider}${line.repeat(size - 1)}`;
    return `${bar[0]}`;
    }
 }
