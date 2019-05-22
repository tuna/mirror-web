---
---
{% if site.suffix %}
if(!document.location.hostname.endsWith('{{ site.suffix }}') && 
   !document.location.hostname.endsWith('{{ site.suffix }}.')){
  document.title = document.title.replace(/(清华)|(tsinghua)|(tuna)/gi, '');
  $().ready(function(){
    $(document.body).addClass('nonthu');
  })
}
{% endif %}