const express = require('express');
const router = express.Router();
const imageUploadMiddleware = require('../middleware/uploadImage');
const Resizer = require('../imageResizer/resizer');
const path = require('path');
const fs = require('fs');


// for uploading an image
router.post('/upload-image', imageUploadMiddleware.single('image'), async (request, response) => {
  if (!request.file) {
    return response.status(400).json({ ok: false, result: { message: 'not image provided' }});
  } else if (!request.file.mimetype.startsWith('image/')) {
    return response.status(400).json({ ok: false, result: { message: 'file should be an image' }})
  };

  const imagePath = path.resolve(__dirname, '../assets/images');
  const image = request.file;
  const resizer = new Resizer(imagePath, image.originalname);
  const fileName = await resizer.save(image.buffer)
    .catch( errors => {
      console.log(errors);
    });
  
  const responseJson = {
    success: 1,
    file: {
      url: `http://localhost:4000/public/images/${image.originalname}`
    }
  };
  console.log(responseJson);
  response.status(200).json(responseJson);
});

router.post('/upload-post', (request, response) => {
  const post = request.body;
  if (!post) {
    return response.status(400).json({ ok: false, result: { message: 'not post provided' }});
  };
  if (!post.postName) response.status(400).json({ ok: false, result: { message: 'not post name provided' }});

  fs.writeFile(path.resolve(__dirname, `../assets/posts/${post.postName}.json`), JSON.stringify(post), (errors) => {
    if (errors) return response.status(500).json({ ok: false, result: { message: 'server error' }});

    response.status(200).json({ ok: true, result: { message: 'post saved' }});
  });
});


module.exports = router;