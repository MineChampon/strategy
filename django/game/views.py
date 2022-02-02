from django.shortcuts import render
from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        context = super(IndexView, self).get_context_data(*kwargs)
        return render(self.request, self.template_name, context)
