import React from 'react';
import FileUpload from './react-fileupload.jsx';
import Button from '@material-ui/core/Button';
import { Icon } from 'antd';

class FileUploader extends React.Component {

	render() {
		const options = {
			baseUrl: '/manage/product/upload.do',
			fileFieldName: 'upload_file',
			dataType: 'json',
			chooseAndUpload : true,
			uploadSuccess: (res) => {
				this.props.onSuccess(res.data);
			},
			uploadError: (err) => {
				this.props.onError(err.message || '上传图片出错啦');
			}
		}
		return (
			<FileUpload options={options}>
				<Button variant="contained" color="primary" className='btn' style={{ width: 120 }} ref="chooseAndUpload">
				<Icon type="cloud-upload-o" style={{fontSize: 18, paddingRight: 5}}/>上传图片
				</Button>
			</FileUpload>
		)
	}
}

export default FileUploader;
