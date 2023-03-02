/**
 * 布局配置
 */

interface LayoutSettings {
    showSettings: boolean
    showTagsView: boolean
    showSidebarLogo: boolean
    fixedHeader: boolean 
    sidebarTextTheme: boolean 
  }
  
  const layoutSettings: LayoutSettings = {
    showSettings: true,
    showTagsView: true,
    fixedHeader: false,
    showSidebarLogo: true,
    sidebarTextTheme: true,
  }
  
  export default layoutSettings