
const { counters } = require("../models/counterSchema");

async function getNextSequence(name) {
    try {
        const seq_status = await counters.findOneAndUpdate({ name: name }, { $inc: { seq: 1 }});
        const seq_id = await counters.findById({ _id: seq_status._id });
        
        return seq_id.seq;
    } catch (error) {
        console.error("Sorry! Table doesnt exist, no worries we got your back.....");
        console.error("==========================...................................=============================");
        console.log("hang on tight.........................................");
        console.log("we are creating a table for you...........................................");
        
        const seq_status = await counters.create({ name: name, seq: 0 });
        const seq_id = await counters.findById({ _id: seq_status._id });
        
        return seq_id.seq;
    }
}

module.exports.getNextSequence = getNextSequence;