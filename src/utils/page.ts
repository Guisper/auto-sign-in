// 对页面的资源(css js 图片等)路径进行处理
const pageProcessor = (page: string): string =>
  page
    .replace(/\<link.+?\/\>/g, '')
    .replace(/(?<=href=["']).+?(?=["'])/g, '')
    .replace(/(<script(.*?)>)[\s\S]*?(<\/script>)/g, '')
    .replace(/(<div class="card mb-3">)[\s\S]*?(<div class="">)/, '</div>')
    .replace(/(<div class="card-header">)[\s\S]*?(\<tr style="display:none;">)/, '<tr>')
    .replace(/(?<=\<div class="card mb-3">)[\s\S]*?(?=\<div)/, '')
    .replace(/<center>[\s\S]*?<\/center>/, '')
    .replace(/(?<=\<head\>)[\s\S]/, '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">')
    .replace('../../isp/images/protect.png', 'https://xsswzx.cdu.edu.cn/isp/images/protect.png')
    .replace('img/yiliao.png', 'https://xsswzx.cdu.edu.cn/ispstu/com_user/img/yiliao.png')
    .replace('images/load.gif', '')
    .replace('无标题文档', '打卡结果')

export default pageProcessor
