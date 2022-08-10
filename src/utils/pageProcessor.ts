// 对页面的资源(css js 图片等)路径进行处理
const pageProcessor = (page: string): string =>
  page
    .replace(/(?<=\<head>)[\s\S]+?(?=\<\/head>)/, '<link rel="stylesheet" href="./static/style.css">')
    .replace('../../cdu/sdcms/js12/jquery.min.js','https://cdn.bootcdn.net/ajax/libs/jquery/1.10.2/jquery.min.js')
    .replace('assets/css/bootstrap.min.css','https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css')
    .replace('img/yiliao.png', 'https://xsswzx.cdu.edu.cn/ispstu/com_user/img/yiliao.png')
    .replace('images/load.gif', '')
    .replace('img/loading.gif', '')

export default pageProcessor
