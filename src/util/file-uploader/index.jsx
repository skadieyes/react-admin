import React from 'react';
import FileUpload from './react-fileupload.jsx';


class FileUploader extends React.Component {

	render() {
		const options = {
			baseUrl: '/manage/product/upload.do',
			fileFieldName: 'upload_file',
			dataType: 'json',
			uploadSuccess: (res) => {
				this.props.onSuccess(res.data);
			},
			uploadError: (err) => {
				this.props.onError(err.message || '上传图片出错啦');
			}
		}
		return (
			<FileUpload options={options}>
				<button ref="chooseBtn">请选择图片</button>
				<button ref="uploadBtn">upload</button>
			</FileUpload>
		)
	}
}

export default FileUploader;
