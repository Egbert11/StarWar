# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'E:\cc\apps\apps\star_fight\anchor_list.ui'
#
# Created: Tue Apr 01 16:46:10 2014
#      by: PyQt4 UI code generator 4.10.4
#
# WARNING! All changes made in this file will be lost!

from PyQt4 import QtCore, QtGui

try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    def _fromUtf8(s):
        return s

try:
    _encoding = QtGui.QApplication.UnicodeUTF8
    def _translate(context, text, disambig):
        return QtGui.QApplication.translate(context, text, disambig, _encoding)
except AttributeError:
    def _translate(context, text, disambig):
        return QtGui.QApplication.translate(context, text, disambig)

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName(_fromUtf8("MainWindow"))
        MainWindow.resize(718, 635)
        MainWindow.setContextMenuPolicy(QtCore.Qt.NoContextMenu)
        self.centralwidget = QtGui.QWidget(MainWindow)
        self.centralwidget.setObjectName(_fromUtf8("centralwidget"))
        self.labelCaption = QtGui.QLabel(self.centralwidget)
        self.labelCaption.setGeometry(QtCore.QRect(30, 20, 561, 91))
        self.labelCaption.setContextMenuPolicy(QtCore.Qt.NoContextMenu)
        self.labelCaption.setObjectName(_fromUtf8("labelCaption"))
        self.btnClose = QtGui.QPushButton(self.centralwidget)
        self.btnClose.setGeometry(QtCore.QRect(640, 10, 75, 23))
        self.btnClose.setObjectName(_fromUtf8("btnClose"))
        self.webView = QtWebKit.QWebView(self.centralwidget)
        self.webView.setGeometry(QtCore.QRect(30, 150, 661, 451))
        self.webView.setUrl(QtCore.QUrl(_fromUtf8("about:blank")))
        self.webView.setObjectName(_fromUtf8("webView"))
        MainWindow.setCentralWidget(self.centralwidget)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow", None))
        self.labelCaption.setText(_translate("MainWindow", "caption", None))
        self.btnClose.setText(_translate("MainWindow", "关闭按钮", None))

from PyQt4 import QtWebKit
