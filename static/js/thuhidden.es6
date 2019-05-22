---
---
{% if site.suffix %}
if(!String.prototype.endsWith) {
  String.prototype.endsWith = function (ending) {
    if(typeof ending !== 'string') return false;
    if(!ending) return true;
    return this.slice(-ending.length) === ending;
  };
}
if(!document.location.hostname.endsWith('{{ site.suffix }}') && 
   !document.location.hostname.endsWith('{{ site.suffix }}.')){
  document.title = document.title.replace(/(清华)|(tsinghua)|(tuna)/gi, '');
  $().ready(() => {
    $(document.body).addClass('nonthu');
  })
}
{% endif %}