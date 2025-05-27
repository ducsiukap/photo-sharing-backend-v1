const { mongoose } = require('mongoose');
const Photo = require('../models/Photo');

const getPhotosOfUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Photo.find({ user_id: id })
            .populate({
                path: 'user_id',
                select: 'first_name last_name'
            })
            .populate({
                path: 'comments.user_id',
                select: 'first_name last_name'
            });

        // format data
        const data = response.map(photo => ({
            _id: photo.id,
            file_name: photo.file_name,
            date_time: photo.date_time,
            user: photo.user_id,
            comments: photo.comments.map(comment => ({
                comment: comment.comment,
                date_time: comment.date_time,
                user: comment.user_id
            }))
        }));

        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
}

// 
const getCommentByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const UserId = new mongoose.Types.ObjectId(id);

        const data = await Photo.aggregate([
            { $match: { 'comments.user_id': UserId } },
            { $unwind: '$comments' },
            { $match: { 'comments.user_id': UserId } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.user_id',
                    foreignField: '_id',
                    as: 'comments.user'
                }
            },
            { $unwind: '$comments.user' },
            {
                $project: {
                    _id: 1,
                    file_name: 1,
                    user_id: 1,
                    comment: {
                        comment: '$comments.comment',
                        user: {
                            first_name: '$comments.user.first_name',
                            last_name: '$comments.user.last_name'
                        }
                    }
                }
            }
        ])

        // console.log(data);
        res.json({
            success: true,
            data: data
        })

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

const photoController = {
    getPhotosOfUser,
    getCommentByUserId
}

module.exports = photoController;