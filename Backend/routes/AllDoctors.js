const Doctor = require('../models/Doctor');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json(doctors);
        console.log(doctors);
    } 
    catch (error) {
        res.status(500).send('Error fetching doctors data');
    }
});

export default router;

                