from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):

    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)
        account = sociallogin.account

        if account.provider == 'google':
            user_data = sociallogin.account.extra_data

            user.first_name = user_data['given_name']
            user.last_name = user_data['family_name']
            user.email = user_data['email']
            user.save()

        return user