using eRestaunrant.Web.ServiceWrapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eRestaunrant.Web.ServiceProcessors
{
    public interface IServiceProcessor
    {
        ServiceResponse Call<TResult>(Func<TResult> action);
        ServiceResponse Call<T, TResult>(Func<T, TResult> action, T parameter);
        ServiceResponse Call<T, T2, TResult>(Func<T, T2, TResult> action, T parameter, T2 parameter2);
        ServiceResponse Call<T, T2, T3, TResult>(Func<T, T2, T3, TResult> action, T parameter, T2 parameter2, T3 parameter3);
        ServiceResponse Call<T, T2, T3, T4, TResult>(Func<T, T2, T3, T4, TResult> action, T parameter, T2 parameter2, T3 parameter3, T4 parameter4);
        //for void function
        ServiceResponse Call<T>(Action<T> action, T parameter);
        ServiceResponse Call<T, T2>(Action<T, T2> action, T parameter, T2 parameter2);
        ServiceResponse Call<T, T2, T3>(Action<T, T2, T3> action, T parameter, T2 parameter2, T3 parameter3);
        ServiceResponse Call<T, T2, T3, T4>(Action<T, T2, T3, T4> action, T parameter, T2 parameter2, T3 parameter3, T4 parameter4);
    }
}
