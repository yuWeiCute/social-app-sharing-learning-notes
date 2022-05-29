import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { DraftEditor } from './';
import { categories } from '../../../shared/utils/data';
import { client } from '../../../client';
import Spinner from '../../../shared/components/Spinner';
import { motion } from 'framer-motion';


const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [projectLink, setProjectLink] = useState();
  const [codeLink, setCodeLink] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [richtext, setRichtext] = useState("")
  const navigate = useNavigate();

  console.log('Asset', imageAsset);

  const uploadImage = (e) => {
    console.log(e);
    let selectedFile = e.target.files[0];

    // uploading asset to sanity
    // 允许的格式
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg'
      || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff' || selectedFile.type === 'image/webp') {
      setWrongImageType(false);
      setLoading(true);


      /**
       * 针对图片进行压缩,如果图片大小超过压缩阈值,则执行压缩,否则不压缩
       */

      const transformFile = (selectedFile) => {
        return new Promise(resolve => {
          const compressThreshold = 0.1, isPictureCompress = false, pictureQuality = 0.92
          let fileSize = selectedFile.size / 1024 / 1024;

          console.log('before compress, the file size is : ', fileSize + "M");
          console.log(selectedFile);

          //当开启图片压缩且图片大小大于等于压缩阈值,进行压缩
          if (fileSize >= compressThreshold) {
            //声明FileReader文件读取对象
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
              // 生成canvas画布
              const canvas = document.createElement('canvas');
              // 生成img
              const img = document.createElement('img');
              img.src = reader.result;
              img.onload = () => {
                const ctx = canvas.getContext('2d');
                //原始图片宽度、高度
                let originImageWidth = img.width, originImageHeight = img.height;
                //默认最大尺度的尺寸限制在（1920 * 1080）
                console.log('originImageWidth', originImageWidth);
                let maxWidth = 1840, maxHeight = 1080, ratio = maxWidth / maxHeight;
                //目标尺寸
                let targetWidth = originImageWidth, targetHeight = originImageHeight;
                //当图片的宽度或者高度大于指定的最大宽度或者最大高度时,进行缩放图片
                if (originImageWidth > maxWidth || originImageHeight > maxHeight) {
                  //超过最大宽高比例
                  if ((originImageWidth / originImageHeight) > ratio) {
                    //宽度取最大宽度值maxWidth,缩放高度
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originImageHeight / originImageWidth));
                  } else {
                    //高度取最大高度值maxHeight,缩放宽度
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originImageWidth / originImageHeight));
                  }
                }
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                ctx.clearRect(0, 0, targetWidth, targetHeight);
                // 绘制图片
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                // quality值越小,图像越模糊,默认图片质量为0.92
                const imageDataURL = canvas.toDataURL(selectedFile.type || 'image/jpeg', pictureQuality);
                // Canvas 对象除了提供 toDataURL() 方法之外，它还提供了一个 toBlob() 方法，该方法的语法如下：
                // canvas.toBlob(callback, mimeType, qualityArgument) 和 toDataURL() 方法相比，toBlob() 方法是异步的，因此多了个 callback 参数
                console.log('imageDataURL',imageDataURL);   //base64储存信息，
                // 去掉URL的头,并转换为byte
                const imageBytes = window.atob(imageDataURL.split(',')[1]);  //前面是图片信息 “data:image/jpeg;base64,”
                console.log('imageBytes',imageBytes);    //反正很长很长

                const arrayBuffer = new ArrayBuffer(imageBytes.length);
                console.log('arrayBuffer',arrayBuffer);
                const uint8Array = new Uint8Array(arrayBuffer);   //都是0的数组，一万个数分一组查看，下一级一百个分一组查看
                console.log('uint8Array',uint8Array);
                for (let i = 0; i < imageBytes.length; i++) {
                  uint8Array[i] = imageBytes.charCodeAt(i);
                }
                console.log('uint8Array update',uint8Array);   //0-255的数组
                let mimeType = imageDataURL.split(',')[0].match(/:(.*?);/)[1];
                // const blob = new Blob([uint8Array], {type: 'image/png'});
                // const form = new FormData();
                // form.append('file', blob, '1.png');

                let newFile = new File([uint8Array], selectedFile.name, { type: mimeType || 'image/jpeg' });
                console.log('after compress, the selectedFile size is : ', (newFile.size / 1024 / 1024) + "M");
                resolve(newFile)
                // selectedFile = newFile;
                // console.log('after compress, the selectedFile size is2333 : ', (selectedFile.size / 1024 / 1024) + "M");

                // 一次上传多个图片
              };
            };
          } else {
            resolve(selectedFile)
          }
        })
      }


      //用promise先处理图片然后再上传到pipe asset

      transformFile(selectedFile).then((selectedFile) => {
        console.log('beganclient');
        console.log('the selectedFile size is : ', (selectedFile.size / 1024 / 1024) + "M");
        client.assets
          .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
          .then((document) => {
            // console.log(document)
            setImageAsset(document);
            setLoading(false);
          })
          .catch((error) => {
            console.log('Upload failed:', error.message);
          });


      })

    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  let publishedAt = new Date()

  const savePost = () => {
    if (title && description && publishedAt && imageAsset?._id && category && richtext) {
      const doc = {
        _type: 'pin',
        title,
        description,
        publishedAt,
        projectLink,
        codeLink,
        richtext,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,

        },
        categories: [category],
      };
      client.create(doc).then(() => {
        navigate('/work');
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };
  return (
    <motion.div
      whileInView={{ y: [20, 10, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
    >
      <div className="flex flex-col justify-center items-center m-auto mt-5 lg:w-4/5 bg-white">

        <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 w-full">
          <div className="bg-lightGrayColor p-3 flex flex-0.7 w-full">
            <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading && (
                <Spinner />
              )}
              {
                wrongImageType && (
                  <p>It&apos;s wrong file type.</p>
                )
              }

              {!imageAsset ? (
                // 判断图片是否已经有上传
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg">Click to upload</p>
                    </div>

                    <p className="mt-32 text-gray-400">
                      Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={imageAsset?.url}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-3 w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title"
              className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
            />
            {user && (
              <div className="flex gap-2 items-center bg-white rounded-lg ">
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full"
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png"
                  }}
                />
                <p className="font-bold">{user.userName}</p>
              </div>
            )}
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell everyone what your Post is about"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />
            <input
              type="url"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              placeholder="Add a project link (optional)"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />
            <input
              type="url"
              value={codeLink}
              onChange={(e) => setCodeLink(e.target.value)}
              placeholder="Add a code link (optional)"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />

            <div className="flex flex-col">
              <div>
                <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Post Category</p>
                <select
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="others" className="sm:text-bg bg-white">Select Category</option>
                  {categories.map((item) => (
                    <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <DraftEditor
          richtext={richtext} setRichtext={setRichtext} />
        <div className="flex flex-row justify-between items-center w-full pl-3 pr-3 pb-3 lg:pl-5 lg:pr-5 lg:pb-5">
          {fields ? (
            <p className="text-red-500 text-xl transition-all duration-150 ease-in ">Please fill in all required fields.</p>
          ) : <p />}
          <button
            type="button"
            onClick={savePost}
            className="rounded-lg py-2 px-6 shadow text-white bg-secondaryColor hover:bg-transparent transition-all duration-500 hover:text-secColor font-bold"
          >
            Save Post
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default CreatePost;
