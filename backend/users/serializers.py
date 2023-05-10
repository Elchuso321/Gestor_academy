from rest_framework import serializers
from users.models import NewUser
from django.contrib.auth.models import Group

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password','nombre','primer_apellido','groups')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        groups_data = validated_data.pop('groups', [])
        # Create user
        print("\n\n\n\n\n\n\n\n\n\n\n\n",groups_data,"\n\n\n\n\n\n\n\n\n\n\n\n")
        user = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        # Add user to groups
        # group = Group.objects.get(name='groups')
        # user.groups.add(group)

        for group_name in groups_data:
            # group = Group.objects.get(name=group_name)
            user.groups.add(group_name)
        return user

    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     groups_data = validated_data.pop('groups', [])
    #     # as long as the fields are the same, we can just use this
    #     instance = self.Meta.model(**validated_data)
    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()
    #     return instance