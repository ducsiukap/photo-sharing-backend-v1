const User = require('../models/User');
const jwt = require('jsonwebtoken');

// find all
const getAllUser = async (req, res) => {
    try {
        const data = await User.aggregate([
            {
                $lookup: {
                    from: 'photos',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'user_photos'
                }
            }, {
                $addFields: {
                    imageCount: { $size: '$user_photos' }
                }
            }, {
                $lookup: {
                    from: 'photos',
                    let: { userId: '$_id' },
                    pipeline: [
                        { $unwind: '$comments' },
                        {
                            $match: {
                                $expr: { $eq: ['$$userId', '$comments.user_id'] }
                            }
                        }
                    ],
                    as: 'user_comments'
                }
            }, {
                $addFields: { commentCount: { $size: '$user_comments' } }
            }, {
                $project: {
                    _id: 1,
                    first_name: 1,
                    last_name: 1,
                    imageCount: 1,
                    commentCount: 1
                }
            }
        ]);
        // console.log(data);
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    };
}

// find one by id
const getOneUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findById(id, '_id first_name last_name location description occupation');
        if (!data) throw Error('User not found!');
        res.json({
            success: true,
            data
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    };
}

// login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username, password: password }, '_id first_name last_name');
        if (!user) throw new Error('Login information is incorrect!');

        // console.log(process.env.JWT_SECRET);
        const token = jwt.sign({ _id: user._id, first_name: user.first_name, last_name: user.last_name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            success: true,
            data: {
                token: token,
                user: user
            }
        })

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    };
}

const signUp = async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
        if (await User.findOne({ username: user.username })) {
            return res.json({
                success: false,
                error: 'username is existed'
            })
        }

        const newUser = new User({
            first_name: user.first_name,
            last_name: user.last_name,
            location: user.location,
            occupation: user.occupation,
            description: user.description,
            username: user.username,
            password: user.password
        });

        await newUser.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const userData = {
            _id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name
        };

        res.json({
            success: true,
            data: {
                token: token,
                user: userData
            }
        });

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

const userController = {
    getAllUser,
    getOneUserById,
    login,
    signUp
}

module.exports = userController;