// 获取模态框
var languageModal = document.getElementById("languageModal");
var logoutModal = document.getElementById("logoutModal");

// 获取按钮来打开模态框
var settingBtn = document.getElementById("settingBtn");
var logoutBtn = document.getElementById("logoutBtn");

// 获取关闭模态框的按钮
var closeBtns = document.getElementsByClassName("close");



//基础弹窗操作
    // 监听文档的点击事件
    document.addEventListener('click', function (event) {
        // 如果点击的目标是模态框本身（不是其子元素）
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        } 
    });
    // 同时监听关闭按钮的点击事件
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('close')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        }
    });



//以下是设置和登录等常规操作
    // 打开语言设置模态框
    settingBtn.onclick = function() {
        languageModal.style.display = "block";
        bindCloseModalEvent(languageModal); // 在打开模态框时重新绑定关闭事件
    }
    // 打开登出模态框
    logoutBtn.onclick = function() {
        logoutModal.style.display = "block";
        bindCloseModalEvent(logoutModal); // 在打开模态框时重新绑定关闭事件
    }
    // 语言选择保存按钮
    document.getElementById("saveLangBtn").onclick = function() {
        var selectedLang = document.getElementById("languageSelect").value;
        alert("已选择语言: " + selectedLang);
        languageModal.style.display = "none"; // 关闭语言选择模态框
    }
    // 确认登出
    document.getElementById("logoutConfirm").onclick = function() {
        alert("您已成功登出！");
        logoutModal.style.display = "none"; // 关闭登出模态框
        // 跳转到登录页面
        window.location.href = '/'; // 跳转到login.html
    }
    // 取消登出
    document.getElementById("logoutCancel").onclick = function() {
        logoutModal.style.display = "none"; // 关闭登出模态框
    }
    // 取消删除
    document.getElementById("deleteCancel").onclick = function() {
        // 获取所有模态框
        const modals = document.querySelectorAll('.modal');
        
        // 遍历所有模态框，将它们的 display 设置为 'none'
        modals.forEach(function(modal) {
            modal.style.display = "none";
        });
    };



//关于增删改查操作
    // 打开添加模态框
    document.addEventListener("click", function (e) {
        //学生
        if (e.target && e.target.id === "addStudentBtn") {
            document.getElementById("addModal").style.display = "block";
        }
        //班级
        if (e.target && e.target.id === "addClassesBtn") {
            document.getElementById("addClassModal").style.display = "block";
        }
        //课程
        if (e.target && e.target.id === "addCoursesBtn") {
            document.getElementById("addCourseModal").style.display = "block";
        }
        //成绩
        if (e.target && e.target.id === "addScoresBtn") {
            document.getElementById("addScoreModal").style.display = "block";
        }

    });
    // 打开编辑模态框
    document.addEventListener("click", function(event) {
        // 编辑学生按钮
        if (event.target && event.target.classList.contains("editStudentBtn")) {
            const button = event.target;

            // 从按钮的 data-* 属性中获取数据并设置到模态框的 input 中
            document.getElementById("editId").value = button.dataset.id;
            document.getElementById("editName").value = button.dataset.name;
            document.getElementById("editAge").value = button.dataset.age;
            document.getElementById("editClassId").value = button.dataset.class;
            document.getElementById("editScore").value = button.dataset.score;
            
            // 显示模态框
            document.getElementById("editModal").style.display = "block";
        }

        // 编辑班级按钮
        if (event.target && event.target.classList.contains("editClassBtn")) {
            const button = event.target;

            // 填充编辑表单数据
            document.getElementById("editClassId").value = button.dataset.id;
            document.getElementById("editClassName").value = button.dataset.name;
            document.getElementById("editLevel").value = button.dataset.level;
            

            // 显示模态框
            document.getElementById("editClassModal").style.display = "block";
        }

        // 编辑课程按钮
        if (event.target && event.target.classList.contains("editCourseBtn")) {
            const button = event.target;

            // 填充编辑表单数据
            document.getElementById("editCourseId").value = button.dataset.id;
            document.getElementById("editCourseName").value = button.dataset.name;
            document.getElementById("editCourseCredit").value = button.dataset.credit;
            

            // 显示模态框
            document.getElementById("editCourseModal").style.display = "block";
        }

        // 编辑成绩按钮
        if (event.target && event.target.classList.contains("editScoreBtn")) {
            const button = event.target;

            // 填充编辑表单数据
            document.getElementById("editStudentId").value = button.dataset.student_id;
            document.getElementById("editCourseId").value = button.dataset.course_id;
            document.getElementById("editScoreScore").value = button.dataset.score;

            // 显示模态框
            document.getElementById("editScoreModal").style.display = "block";
        }
    });
    // 打开删除模态框
    document.addEventListener("click", function(event) {
        // 删除学生按钮
        if (event.target && event.target.classList.contains("deleteStudentBtn")) {
            const button = event.target;
            
            // 设置删除学生模态框的 ID
            document.getElementById("deleteId").value = button.dataset.id;

            // 显示删除学生模态框
            document.getElementById("deleteModal").style.display = "block";
        }
        // 删除班级按钮
        if (event.target && event.target.classList.contains("deleteClassBtn")) {
            const button = event.target;

            // 设置删除班级模态框的 ID
            document.getElementById("deleteClassId").value = button.dataset.id;

            // 显示删除班级模态框
            document.getElementById("deleteClassModal").style.display = "block";
        }
        // 删除课程按钮
        if (event.target && event.target.classList.contains("deleteCourseBtn")) {
            const button = event.target;

            // 设置删除班级模态框的 ID
            document.getElementById("deleteCourseId").value = button.dataset.id;

            // 显示删除班级模态框
            document.getElementById("deleteCourseModal").style.display = "block";
        }
        // 删除成绩按钮
        if (event.target && event.target.classList.contains("deleteScoreBtn")) {
            const button = event.target;

            // 设置删除班级模态框的 ID
            document.getElementById("deleteStudentId").value = button.dataset.student_id;
            document.getElementById("deleteCourseId").value = button.dataset.course_id;

            // 显示删除班级模态框
            document.getElementById("deleteScoreModal").style.display = "block";
        }
    });

    document.addEventListener("submit", function (e) {
       // console.log(e);
        // 添加班级
        if (e.target && e.target.id == "addClassForm") {
            e.preventDefault(); // 阻止默认表单提交
            const formData = new FormData(e.target);
    
            fetch("/add_class", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("班级添加成功！");
                    location.reload(); // 刷新页面以显示新数据
                } else {
                    alert("添加失败，请重试！");
                }
            })
            .catch((error) => console.error("添加班级出错:", error));
        }
    
        // 编辑班级
        if (e.target && e.target.id == "editClassForm") {
            
            e.preventDefault(); // 阻止默认表单提交
            const formData = new FormData(e.target);
    
            fetch("/edit_class", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("班级编辑成功！");
                    location.reload(); // 刷新页面以显示新数据
                } else {
                    alert("编辑失败，请重试！");
                }
            })
            .catch((error) => console.error("编辑班级出错:", error));
        }
    
        // 删除班级
        if (e.target && e.target.id == "deleteClassForm") {
            e.preventDefault(); // 阻止默认表单提交
            console.log("触发了编辑班级表单提交");  // 打印出来查看是否触发
            const formData = new FormData(e.target);
    
            fetch("/delete_class", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("班级删除成功！");
                    location.reload(); // 刷新页面以显示新数据
                } else {
                    alert("删除失败：" + data.error);
                }
            })
            .catch((error) => console.error("删除班级出错:", error));
        }
    
        // 新增课程
        if (e.target && e.target.id == "addCourseForm") {
            e.preventDefault();
            const formData = new FormData(e.target);
    
            fetch("/add_course", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("课程添加成功！");
                    location.reload();
                } else {
                    alert("添加失败，请重试！");
                }
            })
            .catch((error) => console.error("添加课程出错:", error));
        }
    
        // 编辑课程
        if (e.target && e.target.id == "editCourseForm") {
            e.preventDefault();
            const formData = new FormData(e.target);
    
            fetch("/edit_course", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("课程编辑成功！");
                    location.reload();
                } else {
                    alert("编辑失败，请重试！");
                }
            })
            .catch((error) => console.error("编辑课程出错:", error));
        }
    
        // 删除课程
        if (e.target && e.target.id == "deleteCourseForm") {
            e.preventDefault();
            const formData = new FormData(e.target);
    
            fetch("/delete_course", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("课程删除成功！");
                    location.reload();
                } else {
                    alert("删除失败，请重试！");
                }
            })
            .catch((error) => console.error("删除课程出错:", error));
        }

        // 新增成绩
        if (e.target && e.target.id == "addScoreForm") {
            e.preventDefault();
            const formData = new FormData(e.target);
    
            fetch("/add_score", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("成绩添加成功！");
                    location.reload();
                } else {
                    alert("添加失败，请重试！");
                }
            })
            .catch((error) => console.error("添加成绩出错:", error));
        }
    
        // 编辑成绩
        if (e.target && e.target.id == "editScoreForm") {
            e.preventDefault();
            console.log(e.target.id)
            console.log(e.target)
            console.log(e)
            const formData = new FormData(e.target);
    
            fetch("/edit_score", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("成绩编辑成功！");
                    location.reload();
                } else {
                    alert("编辑失败，请重试！");
                }
            })
            .catch((error) => console.error("编辑成绩出错:", error));
        }
    
        // 删除成绩
        if (e.target && e.target.id == "deleteScoreForm") {
            e.preventDefault();
            const formData = new FormData(e.target);
    
            fetch("/delete_score", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("成绩删除成功！");
                    location.reload();
                } else {
                    alert("删除失败：" + data.error);
                }
            })
            .catch((error) => console.error("删除成绩出错:", error));
        }
    
        // 新增学生
        if (e.target && e.target.id == "addStudentForm") {
            e.preventDefault();
            const formData = new FormData(e.target);
    
            fetch("/add_student", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("学生添加成功！");
                    location.reload();
                } else {
                    alert("添加失败，请重试！");
                }
            })
            .catch((error) => console.error("添加学生出错:", error));
        }
    
        // 编辑学生
        if (e.target && e.target.id == "editStudentForm") {
            e.preventDefault();
            const formData = new FormData(e.target);
    
            fetch("/edit_student", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("学生编辑成功！");
                    location.reload();
                } else {
                    alert("编辑失败，请重试！");
                }
            })
            .catch((error) => console.error("编辑学生出错:", error));
        }
    
        // 删除学生
        if (e.target && e.target.id == "deleteStudentForm") {
            e.preventDefault();
            const formData = new FormData(e.target);
    
            fetch("/delete_student", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("学生删除成功！");
                    location.reload();
                } else {
                    alert("删除失败，请重试！");
                }
            })
            .catch((error) => console.error("删除学生出错:", error));
        }
    
        
    });



// // 关于班级表的增删改查操作刷新
//     // 新增班级并刷新
//     document.getElementById("addClassForm").onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);
    
//         fetch("/add_class", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     alert("班级添加成功！");
//                     location.reload(); // 刷新页面以显示新数据
//                 } else {
//                     alert("添加失败，请重试！");
//                 }
//             })
//             .catch((error) => console.error("添加班级出错:", error));
//     };
//     // 编辑班级并刷新
//     document.getElementById("editClassForm").onsubmit = function(event) {
//             event.preventDefault(); // 阻止默认表单提交
//             const formData = new FormData(this);
        
//             fetch("/edit_class", {
//                 method: "POST",
//                 body: formData,
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     if (data.success) {
//                         alert("班级编辑成功！");
//                         location.reload(); // 刷新页面以显示新数据
//                     } else {
//                         alert("编辑失败，请重试！");
//                     }
//                 })
//                 .catch((error) => console.error("编辑班级出错:", error));
//     };
//     // 删除班级并刷新
//     document.getElementById("deleteClassForm").onsubmit = function(event) {
//             event.preventDefault(); // 阻止默认表单提交
//             const formData = new FormData(this);
        
//             fetch("/delete_class", {
//                 method: "POST",
//                 body: formData,
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     if (data.success) {
//                         alert("班级删除成功！");
//                         location.reload(); // 刷新页面
//                     } else {
//                         alert("删除失败：" + data.error);
//                     }
//                 })
//                 .catch((error) => console.error("删除班级出错:", error));
//     };


// //关于课程表的增删改查操作刷新
//     //新增课程并刷新
//     document.getElementById("addCourseForm").onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch("/add_course", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     alert("课程添加成功！");
//                     location.reload(); // 刷新页面以显示新数据
//                 } else {
//                     alert("添加失败，请重试！");
//                 }
//             })
//             .catch((error) => console.error("添加课程出错:", error));
//     };
//     // 编辑课程并刷新
//     document.getElementById("editCourseForm").onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch("/edit_course", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     alert("课程编辑成功！");
//                     location.reload(); // 刷新页面以显示新数据
//                 } else {
//                     alert("编辑失败，请重试！");
//                 }
//             })
//             .catch((error) => console.error("编辑课程出错:", error));
//     };
//     // 删除课程并刷新
//     document.getElementById("deleteCourseForm").onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch("/delete_course", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     alert("课程删除成功！");
//                     location.reload(); // 刷新页面以显示新数据
//                 } else {
//                     alert("删除失败，请重试！");
//                 }
//             })
//             .catch((error) => console.error("删除课程出错:", error));
//     };


// // 关于学生表的增删改查操作刷新
//     // 新增学生并刷新
//     document.getElementById('addStudentForm').onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch('/add_student', {
//             method: 'POST',
//             body: formData,
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert('学生添加成功！');
//                 location.reload(); // 刷新页面以显示新数据
//             } else {
//                 alert('添加失败，请重试！');
//             }
//         })
//         .catch(error => console.error('添加学生出错:', error));
//     }
//     // 编辑学生并刷新
//     document.getElementById('editStudentForm').onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch('/edit_student', {
//             method: 'POST',
//             body: formData,
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert('学生编辑成功！');
//                 location.reload(); // 刷新页面以显示新数据
//             } else {
//                 alert('编辑失败，请重试！');
//             }
//         })
//         .catch(error => console.error('编辑学生出错:', error));
//     }
//     // 删除学生并刷新
//     document.getElementById('deleteStudentForm').onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch('/delete_student', {
//             method: 'POST',
//             body: formData,
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert('学生删除成功！');
//                 location.reload(); // 刷新页面以显示新数据
//             } else {
//                 alert('删除失败，请重试！');
//             }
//         })
//         .catch(error => console.error('删除学生出错:', error));
//     }

// // 关于成绩表的增删改查操作刷新
//     // 新增成绩并刷新
//     document.getElementById("addScoreForm").onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch("/add_score", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     alert("成绩添加成功！");
//                     location.reload(); // 刷新页面以显示新数据
//                 } else {
//                     alert("添加失败，请重试！");
//                 }
//             })
//             .catch((error) => console.error("添加成绩出错:", error));
//     };
//     // 编辑成绩并刷新
//     document.getElementById("editScoreForm").onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch("/edit_score", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     alert("成绩编辑成功！");
//                     location.reload(); // 刷新页面以显示新数据
//                 } else {
//                     alert("编辑失败，请重试！");
//                 }
//             })
//             .catch((error) => console.error("编辑成绩出错:", error));
//     };
//     // 删除成绩并刷新
//     document.getElementById("deleteScoreForm").onsubmit = function(event) {
//         event.preventDefault(); // 阻止默认表单提交
//         const formData = new FormData(this);

//         fetch("/delete_score", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.success) {
//                     alert("成绩删除成功！");
//                     location.reload(); // 刷新页面
//                 } else {
//                     alert("删除失败：" + data.error);
//                 }
//             })
//             .catch((error) => console.error("删除成绩出错:", error));
//     };







