//Interfaz grafica
$(document).ready(function () {
    openFormFancy();
    loadMainMenu();
});

$(window).resize(function () {
    resizeFormFancy();
});

//general loading
function gLoading(evento) {
    var loading = $('<div class="gLoading"></div>'),
        body = $("body");
    if (evento == "open") {
        body.append(loading);
        $(".gLoading").fadeIn(250);
    }
    if (evento == "close") {
        $(".gLoading").fadeOut(250, function () {
            $(".gLoading").remove();
        });
    }
}

//Fancy formulario
function openFormFancy() {
    var fancyForm = $(".fancyForm");
    if (fancyForm.length) {
        fancyForm.colorbox({
            opacity: "0.5",
            closeButton: false,
            width: "100%",
            height: "100%",
            initialWidth: "100px",
            initialHeight: "100px",
            overlayClose: false,
            escKey: false,
            className: "fResize",
            onComplete: function () {
                var btnClose = $("#cboxLoadedContent > .formFancy > .btnClose");
                if (btnClose.length) {
                    btnClose.on("click", function () {
                        $.colorbox.close();
                    });
                }
                //textarea length
                loadMaxlength($(".maxLength"), 500);
                //Formularios
                validateFormEmpresa();
                validateFormEvento();
                validateFormPersona();
                validateFormSegmento();
                validateFormSector();
                validateFormTitulo();
                validateFormEnvio();
                //gLoading('open');
            },
        });
    }
}

function resizeFormFancy() {
    var fancy = $(".fResize");
    if (fancy.length) {
        $.colorbox.resize({ width: "100%", height: "100%" });
    }
}

//Longitud textarea
function loadMaxlength(textarea, max) {
    if (textarea.length) {
        textarea.each(function () {
            $(this).keyup(function () {
                updateLength($(this), max);
            });
            $(this).change(function () {
                updateLength($(this), max);
            });
        });
    }
}
function updateLength(textarea, max) {
    var label = textarea.parent().find(".numCarac");
    label.html("<strong>0</strong> caracteres de <strong>" + max + "</strong>");
    label.html(
        "<strong>" +
            textarea.val().length +
            "</strong> caracteres de <strong>" +
            max +
            "</strong>"
    );
    if (parseInt(textarea.val().length) > max) {
        textarea.val(textarea.val().substring(0, max - 1));
        label.html(
            "<strong>" +
                max +
                "</strong> caracteres de <strong>" +
                max +
                "</strong>"
        );
    }
}

//Menu mobile
function loadMainMenu() {
    $("#btnMenu").on("click", function (e) {
        e.preventDefault();
        openMainMenu($(this), $("#menuSup"), $("body"));
    });
}
function openMainMenu(btn, menu, wrapper) {
    var x = btn.find("span.x"),
        y = btn.find("span.y"),
        z = btn.find("span.z"),
        clase = "menuOpen";
    menu.toggleClass(clase);
    wrapper.toggleClass(clase);
    btn.toggleClass(clase);
    if (
        x.hasClass("collapse") &&
        y.hasClass("collapse") &&
        z.hasClass("collapse")
    ) {
        x.removeClass("rotate45").addClass("rotate30");
        z.removeClass("rotate-45").addClass("rotate-30");
        setTimeout(function () {
            x.removeClass("rotate30");
            z.removeClass("rotate-30");
        }, 50);
        setTimeout(function () {
            y.removeClass("hide");
            x.removeClass("collapse");
            y.removeClass("collapse");
            z.removeClass("collapse");
        }, 70);
    } else {
        x.addClass("collapse");
        y.addClass("collapse");
        z.addClass("collapse");
        setTimeout(function () {
            y.addClass("hide");
            x.addClass("rotate30");
            z.addClass("rotate-30");
        }, 70);
        setTimeout(function () {
            x.addClass("rotate45");
            z.addClass("rotate-45");
        }, 120);
    }
}
