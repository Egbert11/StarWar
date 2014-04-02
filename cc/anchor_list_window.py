#-*- encoding:utf-8 -*-
#======================================================================
#Created on 2014年3月28日
#Author: 潘清远
#Description: 主播排行窗口
#======================================================================
import sys
import os
import logging

from PyQt4 import QtCore, QtGui
from PyQt4.QtCore import *
from PyQt4.QtGui import *
from anchor_list_ui import Ui_MainWindow
import resources_rc

class AnchorListWindow(QMainWindow, Ui_MainWindow):
    def __init__(self, parent):
        super(QMainWindow, self).__init__(parent)
        self.setupUi(self)
        self.setWindowFlags(Qt.Window | Qt.FramelessWindowHint)
        self.setAttribute(Qt.WA_TranslucentBackground)
        
        self.__initControl()
        self.__setupSkin()
        
        self.webView.load(QUrl("http://192.168.11.42:51000/static/index.html"))
    # 设置皮肤
    def __setupSkin(self):
        file = QFile(":/res/anchor_list_window.qss")
        if not file.open(QFile.ReadOnly|QFile.Text):
            return
        qss = QTextStream(file).readAll()
        file.close()
        self.setStyleSheet(qss)
    
    # 控件位置
    def __ControlPositionAndSize(self):
        self.resize(604, 643)
        self.labelCaption.setGeometry(QRect(0, 0, 604, 117))
        self.webView.setGeometry(QRect(2, 117, 600, 525))
        self.btnClose.setGeometry(QRect(590, 50, 9, 9))
    
    # 初始化控件
    def __initControl(self):
        self.__ControlPositionAndSize()
        self.labelCaption.setText("")
        self.btnClose.setText("")
        # 事件连接
        self.btnClose.clicked.connect(self.close)
        self.webView.page().mainFrame().setScrollBarPolicy(Qt.Horizontal, Qt.ScrollBarAlwaysOff)
        self.webView.page().mainFrame().setScrollBarPolicy(Qt.Vertical, Qt.ScrollBarAlwaysOff)
    
    # 打开页面
    def openURL(self, url):
        self.webView.load(QUrl(url))
    
    # 窗口关闭消息
    def closeEvent(self, event):
        self.emit(SIGNAL("closed"), event)
        
    # 窗口自绘
    def paintEvent(self, paintEvent):
        painter = QPainter(self)
        rect = paintEvent.rect()
        rect.setTop(117)
        painter.fillRect(rect, QBrush(QColor(18, 101, 149, 255)))
        rect = QRect(rect.left()+1, rect.top()+1, rect.width()-2, rect.height()-2)
        painter.fillRect(rect, QBrush(QColor(64, 197, 253, 255)))
    
    def mousePressEvent(self, event):
        if event.button() == QtCore.Qt.LeftButton:
            self.dragPosition = event.globalPos() - self.pos()
            if self.dragPosition.y() <= 117:
                self.isOnDrag = True
    
    def mouseReleaseEvent(self, event):
        self.isOnDrag = False

    def mouseMoveEvent(self, event):
        if self.isOnDrag:
            self.move(event.globalPos() - self.dragPosition)
            
    isOnDrag = False
               
if __name__ == "__main__":
    app = QtGui.QApplication(sys.argv)
    wnd = AnchorListWindow(None)
    wnd.show()
    sys.exit(app.exec_())
