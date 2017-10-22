var ErfConnectUiAjax = {
    showPageInModal: function(pageUrl){
        var url  = Drupal.settings.basePath + pageUrl;
        var link = jQuery("<a></a>").attr('href', url).addClass('ctools-use-modal-processed').click(Drupal.CTools.Modal.clickAjaxLink);
        Drupal.ajax[url] = new Drupal.ajax(url, link.get(0), {
            url: url,
            event: 'click',
            progress: { type: 'throbber' }
        });
        link.click();
    }
};

(function($){

    Drupal.behaviors.erf_connect = {
        attach: function(context, settings) {
            $('.erf-link', context).once('erf-processed', function(){
                $(this).click(function(){
                    if(!settings.erfConnect) {
                        settings.erfConnect = {};
                    }

                    settings.erfConnect.modalCaller = this;
                });
            });
        }
    };

    $.fn.setErfConnectAutocompleteValue = function (args) {
        // We need to get the modal caller, if the data isn't available, do nothing.
        if(!Drupal.settings.erfConnect
            || !Drupal.settings.erfConnect.modalCaller) {
            return;
        }

        // With the caller element, we need to get the nearest autocomplete element.
        var caller = $(Drupal.settings.erfConnect.modalCaller);
        var targetInputElement = caller.parent().find('.form-autocomplete.form-item .form-text');

        targetInputElement.val('"' + args.value + '"');

    };
})(jQuery);
